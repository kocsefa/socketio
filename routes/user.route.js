const router = require('express').Router()

module.exports = (userService) => {

  router.get('/', async (req, res) => {
    let user = await userService.find({ name: 'Test User1' })
    // res.send(user)
    res.render('users', user)
    const io = res.locals['socketio']
    io.on('chattername', async (data) => {
      await userService.create({ name: data })
    })
  })

  return router
}
