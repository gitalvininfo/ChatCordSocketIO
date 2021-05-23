
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


//set staticfolder;
app.use(express.static(path.join(__dirname, 'public')));

//run when client connects

const botName = "ChatCord Bot";


io.on('connection', socket => {

    // Welcome user single client
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'))

    // user when connects (all except the current user)
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));

    // all user in general
    // io.emit

    // user leave the chat
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has leave the chat'));
    });


    //listen for chat message
    socket.on('chatMessage', (msg) => {
        console.log(msg);
        io.emit('message', formatMessage('USER', msg));
    })
});;

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));