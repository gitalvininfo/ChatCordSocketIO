
const chatForm = document.getElementById('chat-form');

const socket = io();

// Message from server
socket.on('message', message => {
    console.log(message);
    outPutMessage(message);
})


// Message submit

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', msg);
})


function outPutMessage(message) {
    const div = document.createElement('div');

    div.classList.add('message');
    div.innerHTML = `
    <p class="meta">Brad <span>9:12pm</span></p>
        <p class="test">
            ${message}
        </p>
    `;

    document.querySelector('.chat-messages').appendChild(div);
}