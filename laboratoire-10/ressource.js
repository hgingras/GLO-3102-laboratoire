const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./Task.js')
const User = require('./User.js')

const PORT = 8080;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/laboratoire10')

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
app.post('/users', async (req, res) => {
    const user = await User.findOne();
    let id = ""
    if(user){
        id = user._id;
    }else {
        const newUser = new User();
        await newUser.save();
        id = newUser._id;
    }
    res.status(200).send({
        id: user
    })
});

//GET tasks
app.get('/:userId/tasks', (req, res) => {
    const userId = req.params.userId;
    validateUser(userId, res, async () => {
        const userTasks = await Task.find({userId: userId});
        const tasksDto = userTasks.map((task) => {
            return task.toDTO();
        })        
        res.status(200).send({
            tasks: tasksDto
        });
    });
});


//POST create task
app.post('/:userId/tasks', (req, res) => {
    const userId = req.params.userId;
    validateUser(userId, res, () => {
        const name = req.body.name;
        validateTaskName(name, res, async () => {
            const newTask = new Task({
                userId: userId,
                name: name
            })
            await newTask.save()
            res.status(200).send(newTask.toDTO());
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

const validateUser = async (userId, res, callback) => {
    const user = await User.findById(userId);

    if (user) {
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