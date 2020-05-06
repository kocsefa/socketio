const router = require('express').Router()

module.exports = (chatService) => {

  router.get('/', (req, res) => {
    res.render('chat')
  })

  return router
}
