const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');

const PORT = 8080;

const app = express();
app.use(express.json());

const corsOption = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

app.use(cors(corsOption))

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

//PUT update task
app.put('/:userId/tasks/:taskId', (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    validateUser(userId, res, () => {
        validateTaskId(userId, taskId, res, () => {
            const name = req.body.name;
            validateTaskName(name, res, () => {
                const task = editTask(name, taskId, userId)
                res.status(200).send(task)
            });
        });
    });
});

//DELETE delete task
app.delete('/:userId/tasks/:taskId', (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    validateUser(userId, res, () => {
        validateTaskId(userId, taskId, res, () => {
            let userTasks = tasks[userId];
            const taskIndex = findIndex(taskId, userTasks);
            userTasks.splice(taskIndex, 1);
            res.status(204).send();
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
    if (name !== undefined && name.length !== 0 ) {
        callback();
    } else {
        res.status(400).send('Task definition is invalid');
    }
}

const validateTaskId = (userId, taskId, res, callback) => {
    if (tasks[userId].find(task => task.id === taskId)) {
        callback();
    } else {
        res.status(400).send('Task with id ' + taskId + ' does not exist');
    }
}

const editTask = (name, taskId, user) => {
    let userTasks = tasks[user];
    const taskIndex = findIndex(taskId, userTasks);
    const task = {
        id: taskId,
        name: name
    }
    userTasks[taskIndex] = task;
    return task;
}

const findIndex = (taskId, userTasks) => {
    let taskIndex = -1;
    userTasks.forEach((task, index) => {
        if(task.id === taskId) {
            taskIndex = index
        }
    })
    return taskIndex;
}