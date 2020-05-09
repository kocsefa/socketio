const router = require('express').Router()

module.exports = (services, hubs) => {

  router.get('/', async (req, res) => {
    // Giriş kontrolü yap
    res.render('login', { action: 'login' })
  })
  router.post('/', async (req, res) => {

    let { username, password } = req.body
    
    const token = await services.userService.login({ username, password })

    if (token) {
      return res.status(200).send(token)
    }

    return res.status(401).send({ action: 'login', username: username, error: 'Kullanıcı adı veya parola hatalı' })
  })

  router.get('/register', async (req, res) => {

    res.render('login', { action: 'register' })
  })

  router.post('/register', async (req, res) => {
    let { username, password } = req.body

    try {
      const user = await services.userService.create({ username, password })
      console.log(user)
    } catch (e) {
      return res.status(500).send(e)
    }

    hubs.notificationHub.emit('notification', { msg: `user.route - notication.hub > emit`, name: username })
    hubs.chatHub.emit('message', { msg: `user.route - chat.hub > emit - Yeni kullanıcı kaydoldu: ${username}` })

    return res.redirect('/chat', { username: username })
  })

  return router
}
