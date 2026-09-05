# api/students.py
#
# EVERYTHING about students that is not SQL:
#
#   1. what valid incoming data looks like  (the StudentIn class)
#   2. the URLs                             (the @router lines)
#   3. the rules about what is allowed      (the check inside delete)
#
# The only other students file is database/students.py, which holds the SQL.
# So: two files per resource, and you can read both in a couple of minutes.
#
#     api/students.py        this file
#     database/students.py   the SQL
#
# Want to add "teachers" to the project? Copy those two files, change the noun,
# and add one line to main.py. Nothing else moves.
#
# NOTE: plain "def", never "async def". psycopg is a blocking library, and an
# async route that blocks would freeze the whole server. Plain def makes
# FastAPI run this in a background thread, which is correct.

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, field_validator

from api.helpers import found
from database import students as students_db
from database import enrollments as enrollments_db


# ---------------------------------------------------------------------------
# 1. WHAT VALID DATA LOOKS LIKE
# ---------------------------------------------------------------------------
#
# This class replaces code we used to write by hand:
#
#   OLD                                      NEW
#   ------------------------------------     ---------------------
#   for field in REQUIRED_FIELDS:            name: str
#       if not data.get(field):              email: str
#           raise ValidationError(...)       year: str
#
# Pydantic reads the class and does the checking. FastAPI turns a failure into
# a 422 response naming the exact field that was wrong. We write none of that.
#
# The "In" means "incoming". If this class ever grows to twenty fields with a
# dozen rules, move it into its own file. At this size, keeping it beside the
# endpoints that use it is easier to read.

class StudentIn(BaseModel):
    """What the browser must send when creating or updating a student."""

    # min_length=1 rejects "", and giving no default means "required".
    name: str = Field(min_length=1, max_length=120)
    email: str = Field(min_length=3, max_length=200)
    year: str = Field(min_length=1, max_length=20)

    # A validator is for a rule a type cannot express on its own.
    @field_validator("email")
    @classmethod
    def looks_like_an_email(cls, value):
        if "@" not in value:
            raise ValueError("does not look like an email address")

        if "." not in value:
            raise ValueError("does not look like an email address")

        return value

    # Strip spaces, so "  Ravi  " is stored as "Ravi".
    @field_validator("name", "year", "email")
    @classmethod
    def trim(cls, value):
        return value.strip()


# ---------------------------------------------------------------------------
# 2. THE URLS
# ---------------------------------------------------------------------------
#
# The prefix is set once here. "tags" groups these endpoints on the /docs page.

router = APIRouter(prefix="/api/students", tags=["students"])


@router.get("")
def list_students():
    return students_db.get_all()


@router.get("/{student_id}")
def get_student(student_id: int):
    # "student_id: int" makes FastAPI reject /api/students/abc with a 422.
    return found(students_db.get_one(student_id), "student")


@router.post("", status_code=201)
def create_student(body: StudentIn):
    # body has already been checked and trimmed by StudentIn above.
    # model_dump() turns it back into a plain dictionary for the SQL file.
    clean_data = body.model_dump()
    return students_db.create(clean_data)


@router.put("/{student_id}")
def update_student(student_id: int, body: StudentIn):
    clean_data = body.model_dump()
    updated = students_db.update(student_id, clean_data)
    return found(updated, "student")


# ---------------------------------------------------------------------------
# 3. A RULE THE CLASS ABOVE CANNOT EXPRESS
# ---------------------------------------------------------------------------

@router.delete("/{student_id}")
def delete_student(student_id: int):
    """
    enrollments.student_id points at students.id, so Postgres refuses to delete
    a student who still has enrollments. Without the check below, that refusal
    arrives as a 500 Internal Server Error, which wrongly suggests our server
    is broken. It is not: the request is simply not allowed.

    StudentIn cannot check this. It only ever sees name, email and year.
    Answering "does this student have enrollments?" means reading another
    table, which is why the rule lives here with the endpoint.
    """
    student = found(students_db.get_one(student_id), "student")

    # Count how many enrollments belong to this student.
    # A plain loop: look at every enrollment, and add 1 when it matches.
    all_enrollments = enrollments_db.get_all()
    blocking_count = 0

    for enrollment in all_enrollments:
        if enrollment["student_id"] == student_id:
            blocking_count = blocking_count + 1

    if blocking_count > 0:
        # 409 Conflict: "what you asked for clashes with data that exists".
        raise HTTPException(
            status_code=409,
            detail=(
                f"Cannot delete {student['name']}: still enrolled in "
                f"{blocking_count} course(s). Remove those enrollments first."
            ),
        )

    students_db.delete(student_id)
    return {"deleted": True}
