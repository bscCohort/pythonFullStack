from http.server import HTTPServer
from router import StudentRouter
from database.connection import init_database

def run_server():
    init_database()
    print("🚀 Server running at http://localhost:8000")
    server = HTTPServer(("", 8000), StudentRouter)
    server.serve_forever()

if __name__ == "__main__":
    run_server()