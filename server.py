# import json, os
# from http.server import BaseHTTPRequestHandler, HTTPServer

# # Always use absolute path
# BASE_DIR = os.path.dirname(__file__)
# DATA_FILE = os.path.join(BASE_DIR, "notes.json")


from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import os
from urllib.parse import urlparse
import data_store

class StudentServerHandler(BaseHTTPRequestHandler):
    
    def do_OPTIONS(self):
        """Handle OPTIONS requests for CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_GET(self):
        """Handle GET requests"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        if path == '/' or path == '/index.html':
            self.serve_html_file()
        elif path == '/api/students':
            self.get_all_students()
        elif path.startswith('/api/students/'):
            student_id = int(path.split('/')[-1])
            self.get_student(student_id)
        elif path.startswith('/static/'):
            self.serve_static_file()
        else:
            self.send_404()
    
    def do_POST(self):
        """Handle POST requests"""
        if self.path == '/api/students':
            self.create_student()
        else:
            self.send_404()
    
    def do_PUT(self):
        """Handle PUT requests"""
        if self.path.startswith('/api/students/'):
            student_id = int(self.path.split('/')[-1])
            self.update_student(student_id)
        else:
            self.send_404()
    
    def do_DELETE(self):
        """Handle DELETE requests"""
        if self.path.startswith('/api/students/'):
            student_id = int(self.path.split('/')[-1])
            self.delete_student(student_id)
        else:
            self.send_404()
    
    def get_all_students(self):
        """Get all students"""
        students = data_store.get_all_students()
        self.send_json_response(200, students)
    
    def get_student(self, student_id):
        """Get single student"""
        student = data_store.get_student_by_id(student_id)
        if student:
            self.send_json_response(200, student)
        else:
            self.send_json_response(404, {'error': 'Student not found'})
    
    def create_student(self):
        """Create new student"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            if not all(key in data for key in ['name', 'email', 'course', 'year']):
                self.send_json_response(400, {'error': 'Missing required fields'})
                return
            
            new_student = data_store.create_student(
                data['name'], 
                data['email'], 
                data['course'], 
                data['year']
            )
            
            self.send_json_response(201, new_student)
        
        except Exception as e:
            self.send_json_response(400, {'error': str(e)})
    
    def update_student(self, student_id):
        """Update student"""
        try:
            content_length = int(self.headers['Content-Length'])
            put_data = self.rfile.read(content_length)
            data = json.loads(put_data.decode('utf-8'))
            
            updated_student = data_store.update_student(
                student_id,
                data['name'],
                data['email'],
                data['course'],
                data['year']
            )
            
            if updated_student:
                self.send_json_response(200, updated_student)
            else:
                self.send_json_response(404, {'error': 'Student not found'})
        
        except Exception as e:
            self.send_json_response(400, {'error': str(e)})
    
    def delete_student(self, student_id):
        """Delete student"""
        deleted_student = data_store.delete_student(student_id)
        
        if deleted_student:
            self.send_json_response(200, {'message': 'Student deleted', 'student': deleted_student})
        else:
            self.send_json_response(404, {'error': 'Student not found'})
    
    def send_json_response(self, status_code, data):
        """Send JSON response with CORS headers"""
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
    
    def serve_html_file(self):
        """Serve HTML file"""
        try:
            with open('templates/index.html', 'r', encoding='utf-8') as file:
                content = file.read()
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(content.encode('utf-8'))
        except FileNotFoundError:
            self.send_404()
    
    def serve_static_file(self):
        """Serve static files"""
        file_path = self.path[1:]
        try:
            with open(file_path, 'rb') as file:
                content = file.read()
            
            if file_path.endswith('.css'):
                content_type = 'text/css'
            elif file_path.endswith('.js'):
                content_type = 'application/javascript'
            else:
                content_type = 'application/octet-stream'
            
            self.send_response(200)
            self.send_header('Content-type', content_type)
            self.end_headers()
            self.wfile.write(content)
        except FileNotFoundError:
            self.send_404()
    
    def send_404(self):
        """Send 404"""
        self.send_response(404)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b'<h1>404 - Not Found</h1>')
    
    def log_message(self, format, *args):
        """Log messages"""
        print(f"[{self.log_date_time_string()}] {format % args}")


def run_server(port=8000):
    """Start server"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, StudentServerHandler)
    print(f"🚀 Server running on http://localhost:{port}")
    print("Press Ctrl+C to stop\n")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n⏹ Server stopped!")
        httpd.shutdown()


if __name__ == '__main__':
    run_server()