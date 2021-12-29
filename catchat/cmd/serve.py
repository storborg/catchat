import sys

import uvicorn

from ..app import CatChatApp


def main(argv=sys.argv):
    app = CatChatApp()
    kwargs = {}
    # Maybe add port options
    uvicorn.run(app, **kwargs)
