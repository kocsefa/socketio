const router = require('express').Router()

module.exports = (services, hubs) => {

  router.get('/', async (req, res) => {
    // Giriş kontrolü yap
    res.render('login', { action: 'login' })
  })
  router.get('/login', async (req, res) => {
    // Giriş kontrolü yap
    res.render('login', { action: 'login' })
  })
  router.get('/register', async (req, res) => {

    res.render('login', { action: 'register' })
  })

  router.post('/login', async (req, res) => {
    let { username, password } = req.body

    const authenticated = await services.userService.login({ username, password })

    if (authenticated) {
      return res.cookie('authenticatedUser', `${username}`).redirect('/chat')
    }

    return res.render('login', { action: 'login', username: username, error: 'Kullanıcı adı veya parola hatalı' })
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
