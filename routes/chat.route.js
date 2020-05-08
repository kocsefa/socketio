const router = require('express').Router()

module.exports = (chatService) => {

  router.get('/', (req, res) => {
    console.log(req.cookies)
    res.render('chat')
  })

  return router
}
