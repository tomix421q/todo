const socket = io.connect();
// const socket = io('ws://localhost:3000');

//////////////////////////////DOM///////////////////////////
// LOGIN FORM 
const loginForm = document.querySelector('.login-form');
const nameInput = document.querySelector('#name-input');
const roomInput = document.querySelector('#room-input');
const joinRoomButton = document.querySelector('#room-button');
const extraInfoName = document.querySelector('.extra-info-name')
const extraInfoRoom = document.querySelector('.extra-info-room')
const glitchWrapper = document.querySelector('.glitch-wrapper')

// GAME FORM 
const gameForm = document.querySelector('.game-form');
const chatZone = document.querySelector('.chat-zone');
const chatUl = document.querySelector('.chat-ul');
const sendWordInput = document.querySelector('.send-input');
const sendWordBtn = document.querySelector('#send-word-btn');
const sendCorrectBtn = document.querySelector('.send-correct-btn')

////////////////////////////////CODE/////////////////////////////
// LISTENERS 
sendCorrectBtn.addEventListener('click', () => {
    socket.emit('bothcorrect', {
        correct: true,
        name: nameInput.value
    })
    writeText(`Cakam na druheho hraca ci si mysli ze slova su rovnake`)
})

joinRoomButton.addEventListener("click", () => {

    if (nameInput.value.length < 1) {
        extraInfoName.style = "display:block"
        setInterval(() => {
            extraInfoName.style = "display:none"
        }, 5000);

    }
    if (roomInput.value.length < 1) {
        extraInfoRoom.style = "display:block"
        setInterval(() => {
            extraInfoRoom.style = "display:none"
        }, 5000);
    } else {
        // alert('Meno a room musi byt vyplnena!!!')
        extraInfoName.style = "display:none"
        extraInfoRoom.style = "display:none"

        socket.emit("login", nameInput.value, roomInput.value);
    }
});

sendWordBtn.addEventListener("click", () => {
    socket.emit("send-to", {
        room: roomInput.value,
        message: sendWordInput.value,
        name: nameInput.value
    });

    sendWordBtn.disabled = true
    sendWordInput.disabled = true

    writeText('Cakam na odpoved dalsieho hraca...')
});

//////////////////////////////////////////////////////////////////////
// CREATE NEW ROOM 
socket.on("joined-room", (name) => {
    glitchWrapper.style.display = "none"
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

// GAME MESSAGES 
socket.on('result', (params) => {
    writeText(params)
    sendWordBtn.disabled = false;
    sendWordInput.disabled = false;
    sendWordInput.value = "";
})

// FUNCTION MAKE LI & APPEND 
function writeText(messageText) {
    const el = document.createElement('li');
    el.classList.add("chat-li");
    el.innerHTML = messageText
    chatUl.appendChild(el)
}