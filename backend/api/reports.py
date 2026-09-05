# api/reports.py
#
# Read-only endpoints built from a SQL JOIN.
#
# There is no "ReportIn" class here, because nothing comes IN: you cannot create
# or edit a report, only read one. Not every resource needs every part.

from fastapi import APIRouter

from database import reports as reports_db

router = APIRouter(prefix="/api/reports", tags=["reports"])


@router.get("/enrollments")
def enrollment_report():
    """One SQL query that stitches all three tables into readable rows."""
    return reports_db.get_enrollment_report()
