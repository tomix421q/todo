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
const users = {}
    // SOCKET WORK 


io.on("connection", (socket) => {


    console.log("connected");
    socket.on("login", (name) => {
        console.log("login", name, socket.id);
        socket.broadcast.emit("new-login", name);
    });
    socket.on("send-to", (params) => {
        console.log("send-to", params);
        socket.to(params.recipient).emit("public-message", {
            message: params.message,
            sender: socket.id,
        });
    });
    socket.on("join-room", (roomName) => {
        console.log("join", roomName);
        socket.join(roomName);
        io.to(socket.id).emit("joined-room");
        io.to(roomName).emit("public-message", `New user ${socket.id}`);
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