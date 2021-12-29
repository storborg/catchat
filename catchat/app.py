import os.path
import random

from starlette.applications import Starlette
from starlette.routing import Route, Mount, WebSocketRoute
from starlette.endpoints import WebSocketEndpoint
from starlette.templating import Jinja2Templates
from starlette.staticfiles import StaticFiles

__here__ = os.path.dirname(__file__)
template_dir = os.path.join(__here__, "templates")
static_dir = os.path.join(__here__, "static")


templates = Jinja2Templates(directory=template_dir)

connections = {}


async def index(request):
    return templates.TemplateResponse("index.html", {"request": request})


class ChatAPI(WebSocketEndpoint):
    encoding = "text"

    async def on_connect(self, ws):
        self.uid = random.randint(1000000, 9999999)
        connections[self.uid] = ws
        await ws.accept()

    async def on_disconnect(self, ws, close_code):
        connections[self.uid] = ws

    async def on_receive(self, websocket, data):
        for conn in connections.values():
            await conn.send_text(data)


class CatChatApp(Starlette):
    def __init__(self):
        routes = [
            Route("/", index),
            Mount("/static", StaticFiles(directory=static_dir), name="static"),
            WebSocketRoute("/api", ChatAPI),
        ]
        Starlette.__init__(self, debug=True, routes=routes)
