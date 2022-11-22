const socket = io.connect();
// const socket = io('ws://localhost:3000');

// HTML 
const sendWordBtn = document.getElementById('send-word')
const joinRoomButton = document.getElementById('room-button')
const roomInput = document.getElementById('room-input')
const nameInput = document.getElementById('name-input')






joinRoomButton.addEventListener('click', () => {
    const room = roomInput.value
    const name = nameInput.value
    socket.emit('userlogin', name, room)

})













socket.on('word', text => {

    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)

});

sendWordBtn.onclick = () => {

    const text = document.querySelector('input').value;
    socket.emit('word', text)

}