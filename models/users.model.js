const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { connectionString, DB} = require('../config')

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', function () {
    // Hack the database back to the right one, because when using mongodb+srv as protocol.
    if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
        mongoose.connection.db = mongoose.connection.client.db(DB);
    }
    console.log('users.model - Connection to MongoDB established.')
})

const usersSchema = new Schema({
    name: String,
    sockets: Array
})

const usersModel = mongoose.model('Users', usersSchema, 'users')

module.exports = usersModel