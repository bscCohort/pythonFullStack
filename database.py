import sqlite3
from datetime import datetime

DB_FILE = 'students.db'

def get_connection():
    """Get database connection"""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row  # This allows accessing columns by name
    return conn

def init_database():
    """Initialize database and create tables"""
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            course TEXT NOT NULL,
            year TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT
        )
    ''')
    
    conn.commit()
    conn.close()
    print("✓ Database initialized")

# CREATE
def create_student(name, email, course, year):
    """Add a new student"""
    conn = get_connection()
    cursor = conn.cursor()
    
    created_at = datetime.now().isoformat()
    
    cursor.execute('''
        INSERT INTO students (name, email, course, year, created_at)
        VALUES (?, ?, ?, ?, ?)
    ''', (name, email, course, year, created_at))
    
    student_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return get_student_by_id(student_id)

# READ
def get_all_students():
    """Get all students"""
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM students ORDER BY id DESC')
    rows = cursor.fetchall()
    conn.close()
    
    # Convert Row objects to dictionaries
    students = []
    for row in rows:
        students.append(dict(row))
    
    return students

def get_student_by_id(student_id):
    """Get a single student by ID"""
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM students WHERE id = ?', (student_id,))
    row = cursor.fetchone()
    conn.close()
    
    if row:
        return dict(row)
    return None

# UPDATE
def update_student(student_id, name, email, course, year):
    """Update an existing student"""
    conn = get_connection()
    cursor = conn.cursor()
    
    updated_at = datetime.now().isoformat()
    
    cursor.execute('''
        UPDATE students
        SET name = ?, email = ?, course = ?, year = ?, updated_at = ?
        WHERE id = ?
    ''', (name, email, course, year, updated_at, student_id))
    
    conn.commit()
    affected_rows = cursor.rowcount
    conn.close()
    
    if affected_rows > 0:
        return get_student_by_id(student_id)
    return None

# DELETE
def delete_student(student_id):
    """Delete a student"""
    conn = get_connection()
    cursor = conn.cursor()
    
    # Get student before deleting
    student = get_student_by_id(student_id)
    
    if student:
        cursor.execute('DELETE FROM students WHERE id = ?', (student_id,))
        conn.commit()
        conn.close()
        return student
    
    conn.close()
    return None