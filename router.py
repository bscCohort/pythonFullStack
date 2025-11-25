from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from handlers.html_handler import serve_html
from handlers.static_handler import serve_static
from handlers.student_handler import (
    get_all_students, get_student, create_student,
    update_student, delete_student
)
from utils.responses import send_404
from middlewares import add_cors_headers


class StudentRouter(BaseHTTPRequestHandler):

    # ----- OPTIONS (CORS preflight) -----
    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    # ----- GET -----
    def do_GET(self):
        path = urlparse(self.path).path

        if path in ("/", "/index.html"):
            return serve_html(self)

        if path.startswith("/static/"):
            return serve_static(self)

        if path == "/api/students":
            return get_all_students(self)

        if path.startswith("/api/students/"):
            student_id = int(path.split("/")[-1])
            return get_student(self, student_id)

        return send_404(self)

    # ----- POST -----
    def do_POST(self):
        if self.path == "/api/students":
            return create_student(self)

        return send_404(self)

    # ----- PUT -----
    def do_PUT(self):
        if self.path.startswith("/api/students/"):
            student_id = int(self.path.split("/")[-1])
            return update_student(self, student_id)

        return send_404(self)

    # ----- DELETE -----
    def do_DELETE(self):
        if self.path.startswith("/api/students/"):
            student_id = int(self.path.split("/")[-1])
            return delete_student(self, student_id)

        return send_404(self)

    def log_message(self, format, *args):
        print(f"[Server] {format % args}")
