# main.py
#
# The whole server setup. Run it with:
#
#     uvicorn main:app --reload
#
# --reload restarts automatically every time you save a file.
#
# This is the only file at the top level, because it is the entry point.
# Everything else lives in a folder named after what it does:
#
#   api/        what valid data looks like, the URLs, and the rules
#   database/   the SQL
#
# Every resource is TWO files with the same name:
#
#     api/students.py       database/students.py
#     api/courses.py        database/courses.py
#     api/enrollments.py    database/enrollments.py
#
# Adding "teachers" means copying those two, changing the noun, and adding one
# line below. Nothing else moves.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from config import FRONTEND_DIST
from database.setup import init_database

from api import students, courses, enrollments, reports

app = FastAPI(
    title="Student Management System API",
    description="A small full-stack teaching project. React in the browser, "
                "FastAPI in the middle, PostgreSQL at the back.",
    version="1.0.0",
)


# ---------------------------------------------------------------------------
# CORS
# ---------------------------------------------------------------------------
#
# Browsers block a page served from localhost:5173 from calling localhost:8000
# unless the server says it is allowed. This is that permission, and it is one
# block instead of three headers added to every single response by hand.
#
# "*" means any website may call us. Fine for a class project, too open for a
# real one, where you would list your own domain instead.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Startup
# ---------------------------------------------------------------------------

@app.on_event("startup")
def on_startup():
    """Make sure the tables exist before the first request arrives."""
    init_database()


# ---------------------------------------------------------------------------
# The API
# ---------------------------------------------------------------------------
#
# Each router already knows its own prefix, so this is just a list of what the
# API contains. Adding a resource is one more line.

app.include_router(students.router)
app.include_router(courses.router)
app.include_router(enrollments.router)
app.include_router(reports.router)


# ---------------------------------------------------------------------------
# The React app
# ---------------------------------------------------------------------------
#
# In development you do NOT use this: you run "npm run dev" and Vite serves the
# app on port 5173, forwarding /api calls here.
#
# This part matters after "npm run build", when Python serves the built files.

if FRONTEND_DIST.exists():
    # Vite puts its compiled JS and CSS in dist/assets/
    app.mount("/assets", StaticFiles(directory=FRONTEND_DIST / "assets"), name="assets")

    @app.get("/{full_path:path}")
    def serve_react_app(full_path: str):
        """
        Send index.html for anything that is not an /api call.

        This is why /students/5 works even though no such file exists: every
        page gets the same index.html, and React Router reads the URL in the
        browser and decides which component to show.
        """
        candidate = FRONTEND_DIST / full_path
        if full_path and candidate.is_file():
            return FileResponse(candidate)

        return FileResponse(FRONTEND_DIST / "index.html")
