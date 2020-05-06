const crypto = require('crypto')
const userModel = require('../models/users.model')

async function find(a) {
  return await userModel.find(a)
}
async function findOne(a) {
  return await userModel.findOne(a)
}
async function create(newUser) {
  console.log(newUser)
  const exists = await userModel.exists({ username: newUser.username })
  console.log(exists)
  if (exists) {
    throw 'Username already in use.'
  }

  var salt = crypto.randomBytes(128).toString('base64')
  var hash = crypto.pbkdf2(newUser.password, salt, 10).toString()

  var doc = {
    username: newUser.username,
    passwordHash: hash,
    salt: salt,
    active: true
  }

  const user = await userModel.insertMany(doc)
  return user
}

async function update() {

}

async function remove() {

}

module.exports = {
  find,
  findOne,
  create,
  update,
  remove
}
