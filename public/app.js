const socket = io.connect('http://localhost:3000/');
// const socket = io('ws://localhost:3000');

// HTML
const chatUl = document.querySelector('.chat-ul');
const chatZone = document.querySelector('.chat-zone');
const gameForm = document.querySelector('.game-form');
const loginForm = document.querySelector('.login-form');
const sendWordBtn = document.querySelector('#send-word-btn');
const joinRoomButton = document.getElementById('room-button');
const roomInput = document.getElementById('room-input');
const nameInput = document.getElementById('name-input');
const sendWordInput = document.querySelector('.send-input');



joinRoomButton.addEventListener("click", e => {


    socket.emit("login", nameInput.value, roomInput.value);

});

sendWordBtn.addEventListener("click", () => {
    socket.emit("send-to", {
        room: roomInput.value,
        message: sendWordInput.value,
        name: nameInput.value
    });
});


// CREATE NEW ROOM 
socket.on("joined-room", (name) => {
    loginForm.style.display = "none";
    gameForm.style.display = "block";
    writeText(`${name} sa uspesne pripojil :)`)
});

// CONNECT NEW PLAYER 
socket.on("new-login", (name) => {
    writeText(`${name} sa uspesne pripojil :)`)
});

// WRITE MESSAGE 
socket.on("private-message", (params) => {
    writeText(`Hrac ${params.sender} odpoveda: ${params.message}`)

});


// FUNCTION MAKE LI & APPEND 
function writeText(messageText) {
    const el = document.createElement('li');
    el.classList.add("chat-li");
    el.innerHTML = messageText
    chatUl.appendChild(el)
}