const express = require("express");
const { Server } = require("socket.io");

const PORT = 8080;

const app = express();
app.use(express.json());
const io = new Server(app.listen(PORT));

let takenUsernames = [];

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/username", (req, res) => {
    const username = req.body.username;
    if(takenUsernames.includes(username)) {
        res.sendStatus(401);
    } else {
        takenUsernames.push(username);
        res.sendStatus(200);
    }
})

io.on("connection", (socket) => {
    console.log(`New user with id ${socket.id} just connected`);

    socket.on("disconnect", () => {
        console.log("A user just disconnected")
    })

    socket.on("new-chat", (msg) => {
        console.log("New message: ", msg);
        io.emit("update-chat", msg);
    })

    socket.on("new-connection", (msg) => {
        io.emit('new-connection', msg);
    })
})