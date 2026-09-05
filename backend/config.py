# config.py
#
# Every setting the app needs, read from one place.
#
# Settings come from backend/.env, which is NOT committed to git because it
# contains the database password. backend/.env.example shows the shape.

import os
from pathlib import Path

from dotenv import load_dotenv

# BASE_DIR is the backend/ folder. Using __file__ means .env is found no
# matter which directory you started python from.
BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")

# Where the database is. No default on purpose: if it is missing we want a
# clear error, not a silent fallback to the wrong database.
DATABASE_URL = os.environ.get("DATABASE_URL")

# Which port the API listens on. Hosting providers set PORT themselves.
PORT = int(os.environ.get("PORT", "8000"))

# Where the built React app lives, relative to backend/
FRONTEND_DIST = BASE_DIR.parent / "frontend" / "dist"
