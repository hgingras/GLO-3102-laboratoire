const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./Task.js')
const User = require('./User.js')

const PORT = 8080;

const app = express();
app.use(express.json());

//mongoose.connect('mongodb://localhost/laboratoire10')
//mongoose.connect('mongodb+srv://helene:qwerty123@cluster92157.fmk9ghe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster92157/laboratoire10')

const corsOption = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

app.use(cors(corsOption))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });

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
        id
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
        validateTaskId(taskId, res, () => {
            const name = req.body.name;
            validateTaskName(name, res, async () => {
                const task = await Task.findByIdAndUpdate(taskId, {name: name}, {new: true});
                res.status(200).send(task.toDTO());
            });
        });
    });
});

//DELETE delete task
app.delete('/:userId/tasks/:taskId', (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    validateUser(userId, res, () => {
        validateTaskId(taskId, res, async () => {
            await Task.findByIdAndDelete(taskId);
            res.status(204).send();
        });
    });
});

const validateUser = async (userId, res, callback) => {
    try{
        const user = await User.findById(userId);

        if (user) {
            callback();
        } else {
            res.status(400).send('User with id ' + userId + ' does not exist');
        }
    } catch (error) {
        console.error('Error validating user:', error);
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

const validateTaskId = async (taskId, res, callback) => {
    try{
        const task = await Task.findById(taskId);
        if (task) {
            callback();
        }
        else {
            res.status(400).send('Task with id ' + taskId + ' does not exist');
        }
    } catch (error) {
        console.error('Error validating task:', error);
        res.status(400).send('Task with id ' + taskId + ' does not exist');
    }
}