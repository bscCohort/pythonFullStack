from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from controllers.students import (
    list_students, get_student, create_student, update_student, delete_student
)

from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers


class StudentRouter(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path

        # HTML pages
        if path in ("/", "/index.html"):
            return serve_static(self, "templates/index.html")

        if path in ("/docs", "/docs.html"):
            return serve_static(self, "templates/docs.html")

        if path == "/openapi.yaml":
            return serve_static(self, "openapi.yaml")

        # Static folder
        if path.startswith("/static/"):
            return serve_static(self, path.lstrip("/"))

        # API: List students
        if path == "/api/students":
            return list_students(self)

        # API: Get student by ID
        if path.startswith("/api/students/"):
            student_id = int(path.split("/")[-1])
            return get_student(self, student_id)

        return send_404(self)

    def do_POST(self):
        if self.path == "/api/students":
            return create_student(self)
        return send_404(self)

    def do_PUT(self):
        if self.path.startswith("/api/students/"):
            student_id = int(self.path.split("/")[-1])
            return update_student(self, student_id)
        return send_404(self)

    def do_DELETE(self):
        if self.path.startswith("/api/students/"):
            student_id = int(self.path.split("/")[-1])
            return delete_student(self, student_id)
        return send_404(self)

    def log_message(self, format, *args):
        print(f"[Server] {format % args}")