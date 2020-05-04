const router = require('express').Router()

module.exports = (messageService) => {

  router.get('/', (req, res) => {
    res.send('NOT IMPLEMENTED')
  })

  return router
}
