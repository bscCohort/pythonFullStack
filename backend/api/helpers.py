# api/helpers.py
#
# One helper shared by the routers, because "find it or send a 404" happens
# six times across the API.

from fastapi import HTTPException


def found(item, what):
    """Return the item, or stop the request with a 404."""
    if item is None:
        raise HTTPException(status_code=404, detail=f"No such {what}.")
    return item
