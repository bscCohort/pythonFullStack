from middlewares import add_cors_headers
from utils.responses import send_404


def serve_html(handler):
    try:
        with open("templates/index.html", "r", encoding="utf-8") as f:
            content = f.read()

        handler.send_response(200)
        add_cors_headers(handler)
        handler.send_header("Content-type", "text/html")
        handler.end_headers()

        handler.wfile.write(content.encode("utf-8"))
    except:
        send_404(handler)
