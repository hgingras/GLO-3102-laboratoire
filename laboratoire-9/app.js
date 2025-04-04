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
    console.log(`New user with id ${socket.id} jsut connected`);

    socket.on("disconnect", () => {
        console.log("A user just disconnected")
    })

})