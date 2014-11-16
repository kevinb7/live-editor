// node/socket.io based server so that the editor can communicate with
// output.html in another tab/window/browser/device

var app = require('http').createServer(handler);
var path = require('path');
var url = require("url");
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8000);

function handler (req, res) {
    var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), uri);

    fs.readFile(filename,
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

var editor = null;
var output = null;

io.of('/editor').on('connection', function (socket) {
    console.log('editor connected');

    editor = socket;
    editor.on('disconnect', function () {
        console.log('editor disconnected');
        editor = null;
    });

    editor.on('message', function (data) {
        console.log('message from editor');
        if (output) {
            console.log('sending to output');
            output.emit('server_message', data);
        }
    });

    if (editor !== null && output !== null) {
        editor.emit('ready');
    }
});

io.of('/output').on('connection', function (socket) {
    console.log('output connected');

    output = socket;
    output.on('disconnect', function () {
        console.log('output disconnected');
        output = null;
    });

    output.on('message', function (data) {
        console.log('message from output');
        if (editor) {
            editor.emit('server_message', data);
        }
    });

    if (editor !== null && output !== null) {
        editor.emit('ready');
    }
});
