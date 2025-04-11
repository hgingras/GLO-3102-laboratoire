const mongoose = require('mongoose')
const { Schema } = mongoose;

const user = new Schema ({});

const User = mongoose.model('User', user);

module.exports = User;