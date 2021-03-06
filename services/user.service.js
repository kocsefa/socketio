const crypto = require('crypto')
const userModel = require('../models/users.model')
const jwt = require('jsonwebtoken')
const config = require('../config')

async function create(newUser) {
  // Kullanıcı var mı?
  const exists = await userModel.exists({ username: newUser.username })

  if (exists) {
    throw 'Username already in use.'
  }

  // Tuz verici'den tuzlama kodu al
  const salt = saltDispenser()

  // Kullanıcı şifresini tuzlamaya gönder
  const password = hashPassword(newUser.password, salt)

  // Hata yoksa kullanıcıya ait bilgileri oluştur
  var doc = {
    username: newUser.username,
    passwordHash: password,
    salt: salt,
    active: true
  }

  // Kullanıcıyı kaydet
  const user = await userModel.insertMany(doc)
  console.log(user)
  return user
}

async function find(a) {
  return await userModel.find(a)
}

async function findOne(a) {
  return await userModel.findOne(a)
}

async function login(user) {

  // Kullanıcı var mı?
  const userRecord = await userModel.findOne({ username: user.username })

  if (userRecord) {
    // Şifre doğru mu?
    const password = hashPassword(user.password, userRecord.salt)
    if (password === userRecord.passwordHash) {
      // Token ver
      const token = jwt.sign(
        { username: user.username },
        config.jwtSecret,
        { expiresIn: config.jwtDuration })
      return token
    } else
      return false
  }
}

function hashPassword(password, salt) {
  let hash
  try {
    // Hash password oluşturuluyor
    hash = (crypto.pbkdf2Sync(password, salt, 10, 64, 'sha512')).toString('hex')
  } catch{
    throw 'user.service - Şifreleme aşamasında sorun oluştu.'
  }
  return hash
}

async function remove() {

}

function saltDispenser() {
  return crypto.randomBytes(128).toString('base64')
}

async function update() {

}


module.exports = {
  create,
  find,
  findOne,
  login,
  remove,
  update
}
