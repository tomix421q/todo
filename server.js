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

const rooms = {}

// SOCKET WORK 
var trueArray = []
var users = []
var words = []
io.on("connection", (socket) => {



    socket.on("login", (name, roomName) => {
        console.log("login", name, socket.id);
        socket.id === name;
        io.to(roomName).emit("new-login", name);
        socket.join(roomName);
        io.to(socket.id).emit('joined-room', name);
        // io.to(roomName).emit("private-message", `hello ${name}`);
    });


    socket.on("send-to", (params) => {
        // io.to(params.room).emit("private-message", {
        //     message: params.message,
        //     sender: params.name,

        // });



        var word = params.message
        var meno = params.name
        words.push(word);
        users.push(meno);
        if (words.length === 1) {
            socket.to(params.room).emit('result', `Hrac ${users[0]} uz odpovedal/a prosim zadaj slovo   `)

        }
        if (words.length === 2) {
            if (words[0] === words[1]) {

                io.to(params.room).emit('result', `${users[0]} odpoveda: ${words[0]} a ${users[1]} odpoveda: ${words[1]}  CORRECT!!!`);
                words.length = 0
                users.length = 0
            } else {

                io.to(params.room).emit('result', `${users[0]} odpoveda: ${words[0]} a ${users[1]} odpoveda: ${words[1]}   NOPE!!!`);
                words.length = 0
                users.length = 0
            }
        }

        console.log(words);
        console.log(params.room)

        socket.on('bothcorrect', (correct) => {

            if (correct.correct = true) {
                trueArray.push(correct.correct)
            }
            if (trueArray.length === 2) {
                io.to(params.room).emit('result', `Vyborne nasli ste spolocne slovo alebo aspon rovnake :D,mozte pokracovat a zadat nove slovo :)`)
                trueArray.length = 0
            }
            if (trueArray.length === 1)
                socket.to(params.room).emit('result', `Hrac ${correct.name} si mysli ze slova su rovnake co myslis? Ak ano stlac SPRAVNE ak nie zadaj nove slovo`)
            console.log(trueArray)
        })
    });








});








// socket.on('userlogin', (name, room) => {
//     socket.join(room)
//     socket.id === name
//     rooms[room] = name
//     io.to(room).emit('access', room)

//     console.log(rooms)


// })

// socket.on('send-chat-message', (room, message) => {
//     socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
// })