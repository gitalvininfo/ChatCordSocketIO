
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//get username and room from url
const {username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();


// join chatroom
socket.emit('joinRoom', {username, room});


//Get room and users
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outPutUsers(users);
})

// Message from server
socket.on('message', message => {
    console.log(message);
    outPutMessage(message);

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})


// Message submit

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', msg);

    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
})


function outPutMessage(message) {
    const div = document.createElement('div');

    div.classList.add('message');
    div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="test">
            ${message.text}
        </p>
    `;

    document.querySelector('.chat-messages').appendChild(div);
}


function outputRoomName(room) {
    roomName.innerText = room;
}

function outPutUsers(users) {
    userList.innerHTML = `
    
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    
    `
    
}