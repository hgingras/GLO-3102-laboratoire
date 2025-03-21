const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');

const PORT = 8080;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });


let users = [];
let tasks = {};

//POST get user
app.post('/users', (req, res) => {
    const user = uuidv4();
    users.push(user);
    tasks[user] = [];
    res.status(200).send({
        id: user
    })
});

//GET tasks
app.get('/:userId/tasks', (req, res) => {
    const userId = req.params.userId;
    validateUser(userId, res, () => {
        const userTasks = tasks[userId];
        res.status(200).send({
            tasks: userTasks
        });
    });
});


//POST create task
app.post('/:userId/tasks', (req, res) => {
    const userId = req.params.userId;
    validateUser(userId, res, () => {
        const name = req.body.name;
        validateTaskName(name, res, () => {
            const task = {
                id : uuidv4(),
                name: name
            }
            tasks[userId].push(task);
            res.status(200).send(task);
        });
    });
});




const validateUser = (userId, res, callback) => {
    if (users.includes(userId)) {
        callback();
    } else {
        res.status(400).send('User with id ' + userId + ' does not exist');
    }
}

const validateTaskName = (name, res, callback) => {
    if (name.length > 0 && name !== undefined) {
        callback();
    } else {
        res.status(400).send('Task definition is invalid');
    }
}