const userModel = require('../models/users.model')

async function find(a) {
  return await userModel.find(a)
}
async function findOne(a) {
  return await userModel.findOne(a)
}
async function create(a) {
  await userModel.insertMany(a).then(()=>{
    console.log('başarılı ekleme')
  })
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