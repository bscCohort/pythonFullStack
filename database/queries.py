# database/queries.py
# Actual SQL queries — Create, Read, Update, Delete (CRUD)

from datetime import datetime
from .connection import get_connection


# -----------------------------
# STUDENTS CRUD
# -----------------------------

def students_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM students ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def students_get_one(student_id: int):
    conn = get_connection()
    row = conn.execute("SELECT * FROM students WHERE id = ?", (student_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def students_create(data: dict):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        "INSERT INTO students (name, email, course, year, created_at) VALUES (?, ?, ?, ?, ?)",
        (data["name"], data["email"], data["course"], data["year"], now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return students_get_one(new_id)

def students_update(student_id: int, data: dict):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute("""
        UPDATE students
        SET name=?, email=?, course=?, year=?, updated_at=?
        WHERE id=?
    """, (data["name"], data["email"], data["course"], data["year"], now, student_id))
    conn.commit()
    conn.close()
    return students_get_one(student_id)

def students_delete(student_id: int):
    student = students_get_one(student_id)
    if not student:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM students WHERE id=?", (student_id,))
    conn.commit()
    conn.close()
    return student


# -----------------------------
# COURSES CRUD
# -----------------------------

def courses_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM courses ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def courses_get_one(course_id: int):
    conn = get_connection()
    row = conn.execute("SELECT * FROM courses WHERE id = ?", (course_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def courses_create(data: dict):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        "INSERT INTO courses (title, code, created_at) VALUES (?, ?, ?)",
        (data["title"], data.get("code"), now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return courses_get_one(new_id)

def courses_update(course_id: int, data: dict):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute("""
        UPDATE courses
        SET title=?, code=?, updated_at=?
        WHERE id=?
    """, (data["title"], data.get("code"), now, course_id))
    conn.commit()
    conn.close()
    return courses_get_one(course_id)

def courses_delete(course_id: int):
    course = courses_get_one(course_id)
    if not course:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM courses WHERE id=?", (course_id,))
    conn.commit()
    conn.close()
    return course


# -----------------------------
# ENROLLMENTS CRUD
# -----------------------------

def enrollments_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM enrollments ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def enrollments_get_one(enrollment_id: int):
    conn = get_connection()
    row = conn.execute("SELECT * FROM enrollments WHERE id = ?", (enrollment_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def enrollments_create(data: dict):
    """
    Expected data:
      - student_id (int)
      - course_id (int)
      - enrolled_on (optional)
    """
    conn = get_connection()
    now = datetime.now().isoformat()
    enrolled_on = data.get("enrolled_on") or now

    cur = conn.execute(
        "INSERT INTO enrollments (student_id, course_id, enrolled_on, created_at) VALUES (?, ?, ?, ?)",
        (data["student_id"], data["course_id"], enrolled_on, now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return enrollments_get_one(new_id)

def enrollments_delete(enrollment_id: int):
    enrollment = enrollments_get_one(enrollment_id)
    if not enrollment:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM enrollments WHERE id=?", (enrollment_id,))
    conn.commit()
    conn.close()
    return enrollment


# -----------------------------
# JOIN REPORT (for homework)
# -----------------------------

def enrollment_report():
    """
    Returns joined rows: enrollment + student name + course title
    """
    conn = get_connection()
    rows = conn.execute("""
        SELECT
            e.id AS enrollment_id,
            e.enrolled_on,
            s.id AS student_id,
            s.name AS student_name,
            c.id AS course_id,
            c.title AS course_title
        FROM enrollments e
        JOIN students s ON s.id = e.student_id
        JOIN courses c ON c.id = e.course_id
        ORDER BY e.id DESC;
    """).fetchall()
    conn.close()
    return [dict(r) for r in rows]