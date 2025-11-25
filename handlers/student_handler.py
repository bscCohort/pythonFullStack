import json
import database
from utils.responses import send_json, send_404

def parse_body(handler):
    length = int(handler.headers.get("Content-Length", 0))
    raw = handler.rfile.read(length)
    return json.loads(raw.decode("utf-8"))


def get_all_students(handler):
    students = database.get_all_students()
    return send_json(handler, 200, students)


def get_student(handler, student_id):
    student = database.get_student_by_id(student_id)
    if student:
        return send_json(handler, 200, student)
    return send_404(handler)


def create_student(handler):
    data = parse_body(handler)

    if not all(k in data for k in ("name", "email", "course", "year")):
        return send_json(handler, 400, {"error": "Missing fields"})

    new_student = database.create_student(
        data["name"], data["email"], data["course"], data["year"]
    )

    return send_json(handler, 201, new_student)


def update_student(handler, student_id):
    data = parse_body(handler)

    updated = database.update_student(
        student_id,
        data["name"], data["email"], data["course"], data["year"]
    )

    if updated:
        return send_json(handler, 200, updated)

    return send_404(handler)


def delete_student(handler, student_id):
    deleted = database.delete_student(student_id)

    if deleted:
        return send_json(handler, 200, {"deleted": deleted})

    return send_404(handler)
