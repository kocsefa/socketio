const router = require('express').Router()

module.exports = (services, hubs) => {

  router.get('/', async (req, res) => {
    res.render('users')
  })

  router.post('/', async (req, res) => {
    console.log(req.body)
    let { username } = req.body
    await services.userService.create({ name: username })

    hubs.notificationHub.emit('notification', {msg: `user.route - notication.hub > emit`, name: username })
    hubs.chatHub.emit('message', { msg: `user.route - chat.hub > emit - Yeni kullanıcı kaydoldu: ${username}` })

    return res.redirect('/users')
  })

  return router
}
