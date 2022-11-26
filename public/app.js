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



joinRoomButton.addEventListener("click", () => {
    socket.emit("login", nameInput.value, roomInput.value);
});

sendWordBtn.addEventListener("click", () => {
    console.log("send to", nameInput.value, sendWordInput.value);
    socket.emit("send-to", {
        room: roomInput.value,
        message: sendWordInput.value,
        name: nameInput.value
    });
});

socket.on("new-login", (name) => {
    const el = document.createElement('li');
    el.classList.add("chat-li");
    el.innerHTML = `${name} sa uspesne pripojil :)`;
    chatUl.appendChild(el)
});

socket.on("joined-room", (name) => {
    console.log("successfully joined");
    loginForm.style.display = "none";
    gameForm.style.display = "block";
    const el = document.createElement('li');
    el.classList.add("chat-li");
    el.innerHTML = `${name} sa uspesne pripojil :)`;
    chatUl.appendChild(el)
});

socket.on("private-message", (params) => {
    const el = document.createElement('li');
    el.classList.add("chat-li");
    el.innerHTML = `Hrac ${params.sender} odpoveda: ${params.message}`;
    chatUl.appendChild(el)

});