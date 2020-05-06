const router = require('express').Router()

module.exports = (services, hubs) => {

  router.get('/', async (req, res) => {
    res.render('users')
  })

  router.post('/register', async (req, res) => {
    let { username, password } = req.body
    
    try {
      const user = await services.userService.create({ username, password })
      console.log(user)
    } catch (e) {
      return res.status(500).send(e)
    }

    hubs.notificationHub.emit('notification', {msg: `user.route - notication.hub > emit`, name: username })
    hubs.chatHub.emit('message', { msg: `user.route - chat.hub > emit - Yeni kullanıcı kaydoldu: ${username}` })

    return res.redirect('/users')
  })

  router.post('/login', async (req, res) => {
    return res.send('NOT IMPLEMENTED')
  })

  return router
}
