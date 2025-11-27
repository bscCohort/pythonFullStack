import mimetypes
from core.responses import send_404

def serve_static(handler, filepath):
    try:
        with open(filepath, "rb") as f:
            content = f.read()

        content_type, _ = mimetypes.guess_type(filepath)

        if filepath.endswith(".html"):
            content_type = "text/html"
        if filepath.endswith(".yaml"):
            content_type = "text/yaml"

        handler.send_response(200)
        handler.send_header("Content-Type", content_type or "application/octet-stream")
        handler.end_headers()
        handler.wfile.write(content)

    except Exception as e:
        print("STATIC ERROR:", e)
        send_404(handler)