const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const path = require('path');

const router = require('./app/routes');
app.use(router);

if (process.env.NODE_ENV === 'production') {
    console.log('Production');
    app.use(express.static('/build'));
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
} else {
    console.log('Development');
    app.use(express.static(path.join(__dirname, 'client/public/')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + './client/public/index.html'));
    });
}

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const port = process.env.PORT || 8080;

const server = app.listen(port, function() {
    console.log(`Server listening on PORT ${port}!`);
});

//Websockets
const io = require('socket.io')(server);

io.sockets.on('connection', function(socket) {
    console.log(socket.id + ' connected.');

    socket.on('newMessage', function(data) {
        // io.emit('chat', data);
        console.log(JSON.stringify(data));
        console.log(data.userIdentification + ' sent: ' + data.text); //where to store all of currently online
        data.uniqueID = uuidv4();
        io.sockets.emit('newMessage', data);
    });

    socket.on('disconnect', function() {
        console.log('Client has disconnected');
    });
});
