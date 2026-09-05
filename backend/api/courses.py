# api/courses.py
#
# EVERYTHING about courses that is not SQL: what valid data looks like, the
# URLs, and the rules. The only other courses file is database/courses.py.
#
# Compare this file with api/students.py. Same three sections, same five
# endpoints, different noun. Learn one and you have learned both.

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, field_validator

from api.helpers import found
from database import courses as courses_db
from database import enrollments as enrollments_db


# ---------------------------------------------------------------------------
# 1. WHAT VALID DATA LOOKS LIKE
# ---------------------------------------------------------------------------

class CourseIn(BaseModel):
    """
    Note what happens to the numbers here.

    A browser form always sends TEXT, so fees arrives as "3999". Declaring it
    as a float means Pydantic converts it for us, and rejects "abc" with a
    clear message. We used to do that by hand with try/except around float().
    """

    title: str = Field(min_length=1, max_length=200)
    code: str = Field(min_length=1, max_length=40)
    teacher_name: str = Field(min_length=1, max_length=120)

    # gt=0 means "greater than zero", another check we used to write by hand.
    fees: float = Field(gt=0)
    duration_weeks: int = Field(gt=0)

    @field_validator("title", "code", "teacher_name")
    @classmethod
    def trim(cls, value):
        return value.strip()


# ---------------------------------------------------------------------------
# 2. THE URLS
# ---------------------------------------------------------------------------

router = APIRouter(prefix="/api/courses", tags=["courses"])


@router.get("")
def list_courses():
    return courses_db.get_all()


@router.get("/{course_id}")
def get_course(course_id: int):
    return found(courses_db.get_one(course_id), "course")


@router.post("", status_code=201)
def create_course(body: CourseIn):
    clean_data = body.model_dump()
    return courses_db.create(clean_data)


@router.put("/{course_id}")
def update_course(course_id: int, body: CourseIn):
    clean_data = body.model_dump()
    updated = courses_db.update(course_id, clean_data)
    return found(updated, "course")


# ---------------------------------------------------------------------------
# 3. A RULE THE CLASS ABOVE CANNOT EXPRESS
# ---------------------------------------------------------------------------

@router.delete("/{course_id}")
def delete_course(course_id: int):
    """
    The same rule as deleting a student, seen from the other side: you cannot
    remove a course that students are still enrolled in.
    """
    course = found(courses_db.get_one(course_id), "course")

    # Count how many enrollments belong to this course.
    all_enrollments = enrollments_db.get_all()
    blocking_count = 0

    for enrollment in all_enrollments:
        if enrollment["course_id"] == course_id:
            blocking_count = blocking_count + 1

    if blocking_count > 0:
        raise HTTPException(
            status_code=409,
            detail=(
                f"Cannot delete {course['title']}: {blocking_count} student(s) "
                f"are enrolled. Remove those enrollments first."
            ),
        )

    courses_db.delete(course_id)
    return {"deleted": True}
