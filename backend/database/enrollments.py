# database/enrollments.py
#
# Every SQL statement for the enrollments table, and nothing else.
#
# There is no update() here. An enrollment is a LINK between a student and a
# course, so there is nothing to edit: you create the link or you remove it.

from datetime import datetime

from database.setup import fetch_all, fetch_one, execute


def get_all():
    return fetch_all("SELECT * FROM enrollments ORDER BY id DESC")


def get_one(enrollment_id):
    return fetch_one("SELECT * FROM enrollments WHERE id = %s", (enrollment_id,))


def create(data):
    now = datetime.now().isoformat()

    # The caller may or may not send an enrolled_on date. If it did not, use
    # today. Written out as an if/else rather than the "or" shortcut.
    if "enrolled_on" in data and data["enrolled_on"]:
        enrolled_on = data["enrolled_on"]
    else:
        enrolled_on = now

    new_id = execute(
        """
        INSERT INTO enrollments (student_id, course_id, enrolled_on, created_at)
        VALUES (%s, %s, %s, %s)
        RETURNING id
        """,
        (data["student_id"], data["course_id"], enrolled_on, now),
    )
    return get_one(new_id)


def delete(enrollment_id):
    enrollment = get_one(enrollment_id)
    if enrollment is None:
        return None

    execute("DELETE FROM enrollments WHERE id = %s", (enrollment_id,))
    return enrollment
