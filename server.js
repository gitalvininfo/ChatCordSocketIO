
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


//set staticfolder;
app.use(express.static(path.join(__dirname, 'public')));

//run when client connects


io.on('connection', socket => {


    console.log('Server connected...')

    // Welcome user single client
    socket.emit('message', 'Welcome user')

    // user when connects (all except the current user)
    socket.broadcast.emit('message', 'A user has joined the chat');

    // all user in general
    // io.emit

    // user leave the chat
    socket.on('disconnect', () => {
        io.emit('message', 'A user has leave the chat');
    });


    //listen for chat message
    socket.on('chatMessage', (msg) => {
        console.log(msg);
        io.emit('message', msg);
    })
});;

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));