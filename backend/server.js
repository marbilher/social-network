const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const path = require('path');

if (process.env.NODE_ENV === 'Production') {
    app.use(express.static('client/build'));
    app.get('*', function (req, res) {
        console.log(path.join(__dirname, '../client/build/index.html'))
        res.sendFile(path.join(__dirname + '/..' +'/client/build/index.html'));
    });

//Create-react-app uses yarn buildpack to resolve %PUBLIC_URL%
//Errors when serving index.html through node w/o build
//https://stackoverflow.com/questions/50824024/urierror-failed-to-decode-param-public-url-favicon-ico

// } else {     
//     console.log('Development');
//     app.use(express.static(path.join(__dirname, 'client/public/')));
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname + '/..' +'/client/public/index.html'));
//     });
}


const router = require('./app/routes');
app.use(router);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const port = process.env.PORT || 8080;

const server = app.listen(port, function () {
    console.log(`Server listening on PORT ${port}!`);
});

//Websockets
const io = require('socket.io')(server);

// function serverEmitHeartbeat() {
//     let data = 'heartbeat';
//     let date = new Date();

//     setTimeout(() => {
//         setInterval(() => serverEmitHeartbeat(), 6000);
//         io.emit('serverEmitHeartbeat', data);
//     }, (60 - date.getSeconds()) * 100);
// }
// serverEmitHeartbeat();

io.sockets.on('connection', function (socket) {
    console.log(socket.id + ' connected.');

    socket.on('clientRegisterUserOnline', function (data) {
        console.log('User: ' + data + ' has joined.');
        socket.emit('serverEmitCurrentlyOnline', data);
    });

    socket.on('clientSendNewMessage', function (data) {
        io.sockets.emit('serverEmitCurrentlyOnline', data.userIdentification);
        console.log(data.userIdentification + ' sent: ' + data.text);
        data.uniqueID = uuidv4();
        io.sockets.emit('serverSendNewMessage', data);
    });

    socket.on('disconnect', function () {
        console.log('Client has disconnected');
    });
});
