const socket = io.connect('http://localhost:3000/');
// const socket = io('ws://localhost:3000');

// HTML
const chatUl = document.querySelector('.chat-ul');
const gameForm = document.querySelector('.game-form');
const loginForm = document.querySelector('.login-form');
const sendWordBtn = document.querySelector('#send-word-btn');
const joinRoomButton = document.getElementById('room-button');
const roomInput = document.getElementById('room-input');
const nameInput = document.getElementById('name-input');
const sendWordInput = document.querySelector('.send-input');



joinRoomButton.addEventListener("click", () => {
    // console.log("login as", $nameInput.value);
    socket.emit("login", nameInput.value);
    // console.log("join", $roomInput.value);
    socket.emit("join-room", roomInput.value);
});

sendWordBtn.addEventListener("click", () => {
    console.log("send to", nameInput.value, sendWordInput.value);
    socket.emit("send-to", {
        recipient: roomInput.value,
        message: sendWordInput.value,
    });

});



socket.on("new-login", (name) => {
    console.log("new-login", name);
    const el = document.createElement('li');
    el.classList.add("chat-li");
    el.innerHTML = `${name} sa uspesne pripojil :)`;
    chatUl.appendChild(el)
});

socket.on("private-message", (params) => {
    console.log("private-message", params);
    console.log('lol')
    const el = document.createElement('li');
    el.classList.add("chat-li");
    el.innerHTML = params.message;
    chatUl.appendChild(el)
});

socket.on("joined-room", () => {
    console.log("successfully joined");
    loginForm.style.display = "none";
    gameForm.style.display = "block";
});

socket.on("public-message", (message) => {
    console.log(message);
    const el = document.createElement('li');
    el.classList.add("chat-li");
    el.innerHTML = message.message;
    chatUl.appendChild(el)
});





























// joinRoomButton.addEventListener('click', () => {
//     const room = roomInput.value
//     const name = nameInput.value

//     socket.emit('userlogin', name, room)

// })

// socket.on('access', (room) => {
//     if (access = true) {
//         loginForm.style.display = "none";
//         gameForm.style.display = "block";

//     }
//     console.log('pripojil si sa do room', room)
// })

// socket.on('word', (text) => {

//     const el = document.createElement('li');
//     el.classList.add("chat-li");
//     el.innerHTML = text;
//     chatUl.appendChild(el)

// });

// sendWordBtn.addEventListener('onclick', () => {
//     const text = sendWordInput.value
//         // const text = document.querySelector('input').value;
//     socket.emit('word', text)

// })