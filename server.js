const express = require('express');
const socket = require('socket.io');

// APP SETUP 
const app = express();


// STATIC FILES 
app.use(express.static('public'));

// SOCKET SETUP && SERVER
const port = process.env.PORT || 3000
const server = app.listen(port, console.log(`Server is listening port ${port}.....`))
const io = socket(server)


// PLAYERS BOX ARRAY 
let words = [];
let playerName = [];

// SOCKET WORK 
io.on('connection', (socket) => {
    socket.on('userlogin', (name, room) => {
        name === socket.id
        playerName.push(name)

        if (room === '') {

            io.emit('word', `Prosim zadaj room`);
        } else {
            socket.join(room);
            // socket.to(room).emit('word', `Propojil si sa do room`)
            io.emit('word', `Pripojil si sa do room`);
        }
        console.log(`${name} connected`);
        io.emit('word', `${name} je pripojeny/a`)

    })

    socket.on('join-room', room => {
        socket.join(room)
    })

    socket.on('word', (word) => {
        words.push(word);
        if (words.length === 2) {
            if (words[0] === words[1]) {

                io.emit('word', `${playerName} said ${words} CORRECT!!!`);
                words.length = 0
            } else {

                io.emit('word', `${playerName} said ${words} NOPE!!!`);
                words.length = 0
            }
        }
        console.log(words);
        // console.log(message);
    });





});