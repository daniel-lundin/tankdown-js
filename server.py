import json
import os

import tornado.ioloop
import tornado.web
import tornado.websocket

class MainHandler(tornado.web.RequestHandler):
    """ Renders the index file """
    def get(self):
        return self.write(open("Tankdown.html", 'r').read())

# The list of currently connected clients
CONNECTED_CLIENTS = []

class GameWebSocket(tornado.websocket.WebSocketHandler):
    """ The chat implemententation, all data send to server is plain text, all responses are json """

    def open(self):
        print 'Client connected'
        CONNECTED_CLIENTS.append(self)

    def on_message(self, message):
        for c in CONNECTED_CLIENTS:
            if c != self:
                c.write_message(message)

    def on_close(self):
        CONNECTED_CLIENTS.remove(self)

app = tornado.web.Application([
    (r"/", MainHandler),
    (r"/game", GameWebSocket),
    (r"/js/(.*)", tornado.web.StaticFileHandler, {"path": os.path.join(os.path.dirname(__file__), 'js')}),
    (r"/gfx/(.*)", tornado.web.StaticFileHandler, {"path": os.path.join(os.path.dirname(__file__), 'gfx')})
])

if __name__ == '__main__':
    app.listen(8080)
    tornado.ioloop.IOLoop.instance().start()


