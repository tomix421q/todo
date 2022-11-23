const socket = io.connect();
// const socket = io('ws://localhost:3000');

// HTML
const chatUl = document.querySelector('.chat-ul');
const gameForm = document.querySelector('.game-form');
const loginForm = document.querySelector('.login-form');
const sendWordBtn = document.getElementById('send-word');
const joinRoomButton = document.getElementById('room-button');
const roomInput = document.getElementById('room-input');
const nameInput = document.getElementById('name-input');






joinRoomButton.addEventListener('click', () => {
    const room = roomInput.value
    const name = nameInput.value
    socket.emit('userlogin', name, room)

})








socket.on('full-access', () => {
    if (access = true) {
        loginForm.style.display = "none";
        gameForm.style.display = "block";
    }
})




socket.on('word', (text) => {

    const el = document.createElement('li');
    el.classList.add("chat-li");
    el.innerHTML = text;
    chatUl.appendChild(el)




});

sendWordBtn.onclick = () => {

    const text = document.querySelector('input').value;
    socket.emit('word', text)

}