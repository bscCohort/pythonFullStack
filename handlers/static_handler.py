from utils.responses import send_404
import mimetypes

def serve_static(handler):
    filepath = handler.path.lstrip("/")

    try:
        with open(filepath, "rb") as f:
            content = f.read()

        content_type, _ = mimetypes.guess_type(filepath)
        handler.send_response(200)
        handler.send_header("Content-type", content_type or "application/octet-stream")
        handler.end_headers()
        handler.wfile.write(content)

    except:
        send_404(handler)
