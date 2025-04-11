const mongoose = require('mongoose')
const { Schema } = mongoose;

const task = new Schema({
    userId: String,
    name: String
})

task.methods.toDTO = function() {
    const task_obj = this.toObject();

    const dto = {
        id: task_obj._id,
        name: task_obj.name
    }

    return dto

}

const Task = mongoose.model('Task', task);

module.exports = Task;