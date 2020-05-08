const router = require('express').Router()

module.exports = (services, hubs) => {

  router.get('/', async (req, res) => {
    res.render('users')
  })

  router.post('/login', async (req, res) => {
    let { username, password } = req.body
    console.log(password, username)
    const authenticated = await services.userService.login({ username, password })
    console.log(authenticated)
    return res.send('NOT IMPLEMENTED')
  })

  return router
}
