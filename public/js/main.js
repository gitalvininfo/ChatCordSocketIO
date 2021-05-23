
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

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