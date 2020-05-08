const router = require('express').Router()

module.exports = (services, hubs) => {

  router.get('/', async (req, res) => {
    res.render('index')
  })
  return router
}
