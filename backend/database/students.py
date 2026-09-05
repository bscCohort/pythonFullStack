# database/students.py
#
# Every SQL statement for the students table, and nothing else.
#
# Compare a function here with the old version: the connection handling is
# gone, because setup.py does it. What is left IS the SQL, which is the part
# worth reading.
#
# %s is a placeholder. NEVER build SQL with f-strings or + : that is how SQL
# injection happens. Passing the values separately lets the driver escape them.

from datetime import datetime

from database.setup import fetch_all, fetch_one, execute


def get_all():
    return fetch_all("SELECT * FROM students ORDER BY id DESC")


def get_one(student_id):
    return fetch_one("SELECT * FROM students WHERE id = %s", (student_id,))


def create(data):
    # RETURNING id makes the INSERT hand back the id Postgres just generated.
    new_id = execute(
        """
        INSERT INTO students (name, email, year, created_at)
        VALUES (%s, %s, %s, %s)
        RETURNING id
        """,
        (data["name"], data["email"], data["year"], datetime.now().isoformat()),
    )
    return get_one(new_id)


def update(student_id, data):
    if get_one(student_id) is None:
        return None

    execute(
        """
        UPDATE students
        SET name = %s, email = %s, year = %s, updated_at = %s
        WHERE id = %s
        """,
        (data["name"], data["email"], data["year"], datetime.now().isoformat(), student_id),
    )
    return get_one(student_id)


def delete(student_id):
    student = get_one(student_id)
    if student is None:
        return None

    execute("DELETE FROM students WHERE id = %s", (student_id,))
    return student
