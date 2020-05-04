const router = require('express').Router()

module.exports = (services, hubs) => {

  router.get('/', async (req, res) => {
    res.render('users')
  })

  router.post('/', async (req, res) => {
    console.log(req.body)
    let { username } = req.body
    await services.userService.create({ name: username })

    hubs.notificationHub.emit('notification', { name: username })
    hubs.chatHub.emit('new message', { msg: `Yeni kullanıcı kaydoldu: ${username}` })

    return res.redirect('/users')
  })

  return router
}
