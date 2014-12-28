// node/socket.io based server so that the editor can communicate with
// output.html in another tab/window/browser/device

var app = require('http').createServer(handler);
var path = require('path');
var url = require("url");
var io = require('socket.io')(app);
var fs = require('fs');
var redis = require("redis");

var subClient = redis.createClient();
var pubClient = redis.createClient();

app.listen(8000);

function handler (req, res) {
    var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), uri);

    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading: ' + uri);
        }

        res.writeHead(200);
        res.end(data);
    });
}

var editor = null;
var output = null;

var msg = null;

io.of('/editor').on('connection', function (socket) {
    console.log('editor connected');

    socket.on('disconnect', function () {
        console.log('editor disconnected');
        subClient.unsubscribe("editor");
    });

    socket.on('message', function (data) {
        if (data.code) {
            msg = data;
        }
        pubClient.publish("output", JSON.stringify(data));
    });

    subClient.on("message", function(channel, message) {
        if (channel === "editor") {
            socket.emit("message", JSON.parse(message));
        }
    });

    subClient.subscribe("editor");
});

io.of('/output').on('connection', function (socket) {
    console.log('output connected');

    // send the most recent data
    if (msg !== null) {
        socket.emit('message', msg);
    }

    socket.on('disconnect', function () {
        console.log('output disconnected');
        subClient.unsubscribe("output");
    });

    socket.on('message', function (data) {
        pubClient.publish("editor", JSON.stringify(data));
    });

    subClient.on("message", function(channel, message) {
        if (channel === "output") {
            socket.emit("message", JSON.parse(message));
        }
    });
    
    subClient.subscribe("output");
});
