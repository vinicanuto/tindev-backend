const express = require('express');
const routes = require('./routes');

const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {

};

io.on('connection', socket => {
    //console.log('Nova conexão', socket.id);
    const { user } = socket.handshake.query;

    console.log(user, socket.id);
    connectedUsers[user] = socket.id;
});

mongoose.connect('mongodb+srv://<user>:<senha>@cluster0-b6ibv.mongodb.net/omnistack8?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);

