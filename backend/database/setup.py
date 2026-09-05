# database/setup.py
#
# Everything about GETTING TO the database, in one file:
#
#   1. the connection
#   2. three small helpers so the query files can be one line each
#   3. what the tables look like
#   4. creating them if they are missing
#
# This is the ONLY file in the project that names PostgreSQL. Nothing above it
# knows or cares, which is why moving from SQLite to Postgres was a small job.

import psycopg
from psycopg.rows import dict_row

from config import DATABASE_URL


# ---------------------------------------------------------------------------
# 1. The connection
# ---------------------------------------------------------------------------

def get_connection():
    """
    Open a connection to Postgres.

    row_factory=dict_row makes every row behave like a dictionary, so you can
    write row["name"]. Without it you get plain tuples and have to remember
    that the name happens to be row[1].

    The database is on the internet, not on your laptop, so opening a
    connection takes a moment. That is normal and nothing is broken.
    """
    if not DATABASE_URL:
        raise RuntimeError(
            "DATABASE_URL is not set.\n"
            "Copy backend/.env.example to backend/.env and paste your "
            "connection string into it."
        )

    return psycopg.connect(DATABASE_URL, row_factory=dict_row)


# ---------------------------------------------------------------------------
# 2. Three helpers, so the query files stay readable
# ---------------------------------------------------------------------------
#
# Every query used to be wrapped in the same four lines: open a connection,
# run the SQL, close the connection, convert the rows. That appeared 14 times.
# These three helpers do it once, so students.py, courses.py and
# enrollments.py contain SQL and almost nothing else.

def fetch_all(sql, params=()):
    """Run a SELECT and return every row as a list of dictionaries."""
    conn = get_connection()

    try:
        rows = conn.execute(sql, params).fetchall()

        # Turn each database row into a normal Python dictionary.
        results = []
        for row in rows:
            results.append(dict(row))

        return results

    finally:
        # finally always runs, so the connection closes even after an error.
        conn.close()


def fetch_one(sql, params=()):
    """Run a SELECT and return the first row, or None if there was no row."""
    conn = get_connection()

    try:
        row = conn.execute(sql, params).fetchone()

        if row is None:
            return None

        return dict(row)

    finally:
        conn.close()


def execute(sql, params=()):
    """
    Run an INSERT, UPDATE or DELETE.

    If the SQL ends with "RETURNING id" this hands the new id back, which is
    how we find out what the database just created.
    """
    conn = get_connection()

    try:
        cursor = conn.execute(sql, params)

        # cursor.description is None when the statement returns no rows,
        # which is the case for a plain UPDATE or DELETE.
        if cursor.description is None:
            returned_row = None
        else:
            returned_row = cursor.fetchone()

        conn.commit()

        if returned_row is None:
            return None

        return returned_row["id"]

    finally:
        conn.close()


# ---------------------------------------------------------------------------
# 3. What the tables look like: THE DATABASE SCHEMA
# ---------------------------------------------------------------------------
#
# This is the shape of the STORED data: which tables exist and what columns
# they have. Not to be confused with the StudentIn / CourseIn classes at the top
# of the api/ files, which describe an incoming REQUEST. Two different things:
#
#   this file          what the students table looks like on disk
#   api/students.py    what a request to create a student must contain
#
# Order matters: enrollments points at students and courses, so those two must
# exist first.
#
# Differences from the SQLite version, worth reading once:
#
#   SQLite                              Postgres
#   ----------------------------------  ----------------------------
#   INTEGER PRIMARY KEY AUTOINCREMENT   SERIAL PRIMARY KEY
#   REAL                                DOUBLE PRECISION
#
# SERIAL means "an integer column that counts up on its own", so you never
# supply an id when inserting.

TABLES = [
    """
    CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        year TEXT,
        created_at TEXT,
        updated_at TEXT
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        code TEXT,
        teacher_name TEXT,
        fees DOUBLE PRECISION,
        duration_weeks INTEGER,
        created_at TEXT,
        updated_at TEXT
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS enrollments (
        id SERIAL PRIMARY KEY,
        student_id INTEGER NOT NULL REFERENCES students(id),
        course_id INTEGER NOT NULL REFERENCES courses(id),
        enrolled_on TEXT,
        created_at TEXT,
        updated_at TEXT
    )
    """,
]


# ---------------------------------------------------------------------------
# 4. Creating them
# ---------------------------------------------------------------------------

def init_database():
    """
    Called once when the server starts.

    "CREATE TABLE IF NOT EXISTS" can create a table that is missing, but it
    cannot CHANGE one that already exists. So if you later add a "phone" column
    to students, this will not help you. The tool for that is called a
    MIGRATION: a numbered list of changes applied in order.
    """
    conn = get_connection()

    try:
        cursor = conn.cursor()

        for create_sql in TABLES:
            cursor.execute(create_sql)

        cursor.close()
        conn.commit()

    finally:
        conn.close()

    print("Database ready (PostgreSQL)")
