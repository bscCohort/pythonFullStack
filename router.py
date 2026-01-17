# router.py

from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from controllers.reports import get_enrollment_report

from controllers.students import (
    get_all_students,
    get_student,
    create_student,
    update_student,
    delete_student,
)

from controllers.courses import (
    get_all_courses,
    get_course,
    create_course,
    update_course,
    delete_course,
)

from controllers.enrollments import (
    get_all_enrollments,
    get_enrollment,
    create_enrollment,
    delete_enrollment,
)

from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers


# -------------------------------
# UI ROUTER (SPA shell + static)
# -------------------------------

FRONTEND_ROUTES = {
    "/", "/home",
    "/students", "/courses", "/enrollments",
    "/reports/enrollments",
    "/docs/flow", "/docs",
    "/profiles",
}

def handle_ui_routes(handler, path):
    # Exact SPA routes
    if path in FRONTEND_ROUTES:
        serve_static(handler, "frontend/pages/index.html")
        return True

    # Allow /something.html to map to SPA routes too
    if path.endswith(".html"):
        stripped = path.replace(".html", "")
        if stripped in FRONTEND_ROUTES:
            serve_static(handler, "frontend/pages/index.html")
            return True

    # Serve assets at /assets/... -> frontend/assets/...
    if path.startswith("/assets/"):
        serve_static(handler, "frontend" + path)
        return True

    # Serve anything under /frontend/ directly
    if path.startswith("/frontend/"):
        serve_static(handler, path.lstrip("/"))
        return True

    if path == "/openapi.yaml":
        serve_static(handler, "openapi.yaml")
        return True

    # Dynamic SPA routes (profiles pages)
    # e.g. /profiles/1 should still load index.html and let the SPA router decide
    if path.startswith("/profiles/"):
        serve_static(handler, "frontend/pages/index.html")
        return True

    return False


# -------------------------------
# Helpers
# -------------------------------

def _last_path_id_or_404(handler, path):
    """
    Extract the last path segment and ensure it's a number.
    If it's not a number, return None after sending 404 (no crash).
    """
    last = path.split("/")[-1]
    if not last.isdigit():
        send_404(handler)
        return None
    return int(last)


# -------------------------------
# MAIN ROUTER CLASS
# -------------------------------

class StudentRouter(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    # ---------------------------
    # READ (GET)
    # ---------------------------
    def do_GET(self):
        path = urlparse(self.path).path

        # 1) UI routes first (SPA + static)
        if handle_ui_routes(self, path):
            return

        # ---------------------------
        # STUDENTS
        # ---------------------------
        if path == "/api/students":
            return get_all_students(self)

        if path.startswith("/api/students/"):
            student_id = _last_path_id_or_404(self, path)
            if student_id is None:
                return
            return get_student(self, student_id)

        # ---------------------------
        # COURSES
        # ---------------------------
        if path == "/api/courses":
            return get_all_courses(self)

        if path.startswith("/api/courses/"):
            course_id = _last_path_id_or_404(self, path)
            if course_id is None:
                return
            return get_course(self, course_id)

        # ---------------------------
        # ENROLLMENTS
        # ---------------------------
        if path == "/api/enrollments":
            return get_all_enrollments(self)

        if path.startswith("/api/enrollments/"):
            enrollment_id = _last_path_id_or_404(self, path)
            if enrollment_id is None:
                return
            return get_enrollment(self, enrollment_id)

        # ---------------------------
        # REPORTS (JOIN)
        # ---------------------------
        if path == "/api/reports/enrollments":
            return get_enrollment_report(self)

        return send_404(self)

    # ---------------------------
    # CREATE (POST)
    # ---------------------------
    def do_POST(self):
        path = urlparse(self.path).path

        # STUDENTS
        if path == "/api/students":
            return create_student(self)

        # COURSES
        if path == "/api/courses":
            return create_course(self)

        # ENROLLMENTS
        if path == "/api/enrollments":
            return create_enrollment(self)

        return send_404(self)

    # ---------------------------
    # UPDATE (PUT)
    # ---------------------------
    def do_PUT(self):
        path = urlparse(self.path).path

        # STUDENTS
        if path.startswith("/api/students/"):
            student_id = _last_path_id_or_404(self, path)
            if student_id is None:
                return
            return update_student(self, student_id)

        # COURSES
        if path.startswith("/api/courses/"):
            course_id = _last_path_id_or_404(self, path)
            if course_id is None:
                return
            return update_course(self, course_id)

        return send_404(self)

    # ---------------------------
    # DELETE (DELETE)
    # ---------------------------
    def do_DELETE(self):
        path = urlparse(self.path).path

        # STUDENTS
        if path.startswith("/api/students/"):
            student_id = _last_path_id_or_404(self, path)
            if student_id is None:
                return
            return delete_student(self, student_id)

        # COURSES
        if path.startswith("/api/courses/"):
            course_id = _last_path_id_or_404(self, path)
            if course_id is None:
                return
            return delete_course(self, course_id)

        # ENROLLMENTS
        if path.startswith("/api/enrollments/"):
            enrollment_id = _last_path_id_or_404(self, path)
            if enrollment_id is None:
                return
            return delete_enrollment(self, enrollment_id)

        return send_404(self)

    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")