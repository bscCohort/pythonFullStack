# api/enrollments.py
#
# EVERYTHING about enrollments that is not SQL. The only other enrollments file
# is database/enrollments.py.
#
# Two things differ from students and courses, both worth pointing out in class:
#
#   1. There is no PUT. An enrollment is a LINK between a student and a course.
#      You create the link or you remove it; there is nothing to edit.
#
#   2. Creating one has three rules, and NONE of them fit in the class below,
#      because all three need to read other tables. This is the clearest
#      example in the project of the difference between:
#
#          "is this data the right SHAPE?"   -> the class below
#          "is this request ALLOWED?"        -> the endpoint

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from api.helpers import found
from database import enrollments as enrollments_db
from database import students as students_db
from database import courses as courses_db


# ---------------------------------------------------------------------------
# 1. WHAT VALID DATA LOOKS LIKE
# ---------------------------------------------------------------------------

class EnrollmentIn(BaseModel):
    """Two positive whole numbers. That is genuinely all this can check."""

    student_id: int = Field(gt=0)
    course_id: int = Field(gt=0)


# ---------------------------------------------------------------------------
# 2. THE URLS
# ---------------------------------------------------------------------------

router = APIRouter(prefix="/api/enrollments", tags=["enrollments"])


@router.get("")
def list_enrollments():
    return enrollments_db.get_all()


@router.get("/{enrollment_id}")
def get_enrollment(enrollment_id: int):
    return found(enrollments_db.get_one(enrollment_id), "enrollment")


# ---------------------------------------------------------------------------
# 3. THREE RULES THE CLASS ABOVE CANNOT EXPRESS
# ---------------------------------------------------------------------------

@router.post("", status_code=201)
def create_enrollment(body: EnrollmentIn):
    student_id = body.student_id
    course_id = body.course_id

    # Rule 1: the student must exist.
    if students_db.get_one(student_id) is None:
        raise HTTPException(status_code=404, detail=f"No student with id {student_id}.")

    # Rule 2: the course must exist.
    if courses_db.get_one(course_id) is None:
        raise HTTPException(status_code=404, detail=f"No course with id {course_id}.")

    # Rule 3: the same student cannot join the same course twice.
    # Walk through every existing enrollment and look for a match.
    all_enrollments = enrollments_db.get_all()
    already_enrolled = False

    for enrollment in all_enrollments:
        same_student = enrollment["student_id"] == student_id
        same_course = enrollment["course_id"] == course_id

        if same_student and same_course:
            already_enrolled = True

    if already_enrolled:
        raise HTTPException(
            status_code=409,
            detail="That student is already enrolled in that course.",
        )

    clean_data = body.model_dump()
    return enrollments_db.create(clean_data)


@router.delete("/{enrollment_id}")
def delete_enrollment(enrollment_id: int):
    # Nothing points AT an enrollment, so there is no rule to check here.
    found(enrollments_db.get_one(enrollment_id), "enrollment")
    enrollments_db.delete(enrollment_id)
    return {"deleted": True}
