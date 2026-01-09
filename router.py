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

FRONTEND_ROUTES = {"/", "/home", "/students", "/courses", "/enrollments", "/reports/enrollments", "/docs/flow", "/docs"}

def handle_ui_routes(handler, path):
    if path in FRONTEND_ROUTES:
        serve_static(handler, "frontend/pages/index.html")
        return True

    if path.endswith(".html"):
        stripped = path.replace(".html", "")
        if stripped in FRONTEND_ROUTES:
            serve_static(handler, "frontend/pages/index.html")
            return True

    # Serve assets at /assets/...  -> frontend/assets/...
    if path.startswith("/assets/"):
        serve_static(handler, "frontend" + path)
        return True

    if path.startswith("/frontend/"):
        serve_static(handler, path.lstrip("/"))
        return True

    if path == "/openapi.yaml":
        serve_static(handler, "openapi.yaml")
        return True

    return False




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

        # 1. UI routes first (SPA)
        if handle_ui_routes(self, path):
            return

        # ---------------------------
        # STUDENTS
        # ---------------------------
        if path == "/api/students":
            return get_all_students(self)

        if path.startswith("/api/students/"):
            student_id = int(path.split("/")[-1])
            return get_student(self, student_id)

        # ---------------------------
        # COURSES
        # ---------------------------
        if path == "/api/courses":
            return get_all_courses(self)

        if path.startswith("/api/courses/"):
            course_id = int(path.split("/")[-1])
            return get_course(self, course_id)

        # ---------------------------
        # ENROLLMENTS
        # ---------------------------
        if path == "/api/enrollments":
            return get_all_enrollments(self)

        if path.startswith("/api/enrollments/"):
            enrollment_id = int(path.split("/")[-1])
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
        # STUDENTS
        if self.path == "/api/students":
            return create_student(self)

        # COURSES
        if self.path == "/api/courses":
            return create_course(self)

        # ENROLLMENTS
        if self.path == "/api/enrollments":
            return create_enrollment(self)

        return send_404(self)


    # ---------------------------
    # UPDATE (PUT)
    # ---------------------------
    def do_PUT(self):
        # STUDENTS
        if self.path.startswith("/api/students/"):
            student_id = int(self.path.split("/")[-1])
            return update_student(self, student_id)

        # COURSES
        if self.path.startswith("/api/courses/"):
            course_id = int(self.path.split("/")[-1])
            return update_course(self, course_id)

        return send_404(self)


    # ---------------------------
    # DELETE (DELETE)
    # ---------------------------
    def do_DELETE(self):
        # STUDENTS
        if self.path.startswith("/api/students/"):
            student_id = int(self.path.split("/")[-1])
            return delete_student(self, student_id)

        # COURSES
        if self.path.startswith("/api/courses/"):
            course_id = int(self.path.split("/")[-1])
            return delete_course(self, course_id)

        # ENROLLMENTS
        if self.path.startswith("/api/enrollments/"):
            enrollment_id = int(self.path.split("/")[-1])
            return delete_enrollment(self, enrollment_id)

        return send_404(self)
    


    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")
