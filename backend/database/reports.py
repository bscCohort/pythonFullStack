# database/reports.py
#
# Read-only queries that JOIN tables together.
#
# This is the file to read when explaining what a JOIN does. The Enrollments
# page shows student_id and course_id, which are just numbers. This one query
# follows those numbers into the other two tables and brings back names, codes
# and fees, so the Report page can show something readable.
#
# Three tables, one query, one trip to the database.

from database.setup import fetch_all


def get_enrollment_report():
    return fetch_all("""
        SELECT
            e.id           AS enrollment_id,
            e.enrolled_on,

            s.id           AS student_id,
            s.name         AS student_name,
            s.email        AS student_email,
            s.year         AS student_year,

            c.id           AS course_id,
            c.title        AS course_title,
            c.code         AS course_code,
            c.teacher_name AS teacher_name,
            c.fees         AS fees,
            c.duration_weeks AS duration_weeks

        FROM enrollments e
        JOIN students s ON s.id = e.student_id
        JOIN courses  c ON c.id = e.course_id
        ORDER BY e.id DESC
    """)
