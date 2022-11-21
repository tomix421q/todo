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
var words = [];


// SOCKET WORK 
io.on('connection', (socket) => {


    console.log('a user connected');

    socket.on('message', (message) => {
        words.push(message);

        if (words.length === 2) {
            if (words[0] === words[1]) {
                words.length = 0
                io.emit('message', `${socket.id.substr(0,2)} said ${message} CORRECT!!!`);


            } else {

                words.length = 0
                io.emit('message', `${socket.id.substr(0,2)} said ${message} NOPE!!!`);

            }

        }
        console.log(words);
        console.log(message);
    });
});