# database/courses.py
#
# Every SQL statement for the courses table, and nothing else.

from datetime import datetime

from database.setup import fetch_all, fetch_one, execute


def get_all():
    return fetch_all("SELECT * FROM courses ORDER BY id DESC")


def get_one(course_id):
    return fetch_one("SELECT * FROM courses WHERE id = %s", (course_id,))


def create(data):
    new_id = execute(
        """
        INSERT INTO courses (title, code, teacher_name, fees, duration_weeks, created_at)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id
        """,
        (
            data["title"],
            data["code"],
            data["teacher_name"],
            data["fees"],
            data["duration_weeks"],
            datetime.now().isoformat(),
        ),
    )
    return get_one(new_id)


def update(course_id, data):
    if get_one(course_id) is None:
        return None

    execute(
        """
        UPDATE courses
        SET title = %s, code = %s, teacher_name = %s,
            fees = %s, duration_weeks = %s, updated_at = %s
        WHERE id = %s
        """,
        (
            data["title"],
            data["code"],
            data["teacher_name"],
            data["fees"],
            data["duration_weeks"],
            datetime.now().isoformat(),
            course_id,
        ),
    )
    return get_one(course_id)


def delete(course_id):
    course = get_one(course_id)
    if course is None:
        return None

    execute("DELETE FROM courses WHERE id = %s", (course_id,))
    return course
