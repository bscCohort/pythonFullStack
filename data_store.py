import json
import os
from datetime import datetime

BASE_DIR = os.path.dirname(__file__)
DATA_FILE = os.path.join(BASE_DIR, "students.json")

def load_students():
    """Load students from JSON file"""
    if not os.path.exists(DATA_FILE):
        return []
    
    try:
        with open(DATA_FILE, 'r') as file:
            return json.load(file)
    except json.JSONDecodeError:
        return []

def save_students(students):
    """Save students to JSON file"""
    with open(DATA_FILE, 'w') as file:
        json.dump(students, file, indent=4)

def get_next_id(students):
    """Get next available ID"""
    if not students:
        return 1
    return max(student['id'] for student in students) + 1

# CREATE
def create_student(name, email, course, year):
    """Add a new student"""
    students = load_students()
    
    new_student = {
        'id': get_next_id(students),
        'name': name,
        'email': email,
        'course': course,
        'year': year,
        'created_at': datetime.now().isoformat()
    }
    
    students.append(new_student)
    save_students(students)
    return new_student

# READ
def get_all_students():
    """Get all students"""
    return load_students()

def get_student_by_id(student_id):
    """Get a single student by ID"""
    students = load_students()
    for student in students:
        if student['id'] == student_id:
            return student
    return None

# UPDATE
def update_student(student_id, name, email, course, year):
    """Update an existing student"""
    students = load_students()
    
    for student in students:
        if student['id'] == student_id:
            student['name'] = name
            student['email'] = email
            student['course'] = course
            student['year'] = year
            student['updated_at'] = datetime.now().isoformat()
            save_students(students)
            return student
    
    return None

# DELETE
def delete_student(student_id):
    """Delete a student"""
    students = load_students()
    
    for i, student in enumerate(students):
        if student['id'] == student_id:
            deleted = students.pop(i)
            save_students(students)
            return deleted
    
    return None