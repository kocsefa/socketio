const router = require('express').Router()

module.exports = (chatService) => {

  router.get('/', (req, res) => {
    console.log(req.cookies)
    res.render('chat', { username: req.cookies.authenticatedUser})
  })

  return router
}
