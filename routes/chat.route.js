const router = require('express').Router()

module.exports = (services,hubs) => {

  router.get('/', async (req, res) => {
    const username = await services.userService.findOne({username:req.userData.username})
    const userlist = await services.userService.find()
    console.log(userlist)
    userlist = userlist.map(user => {
      let newInfo = {}
      newInfo.username = user.username
      newInfo.name = user.name
      newInfo.image = user.image
      return newInfo
    })
    res.render('chat',{userlist})
  })

  return router
}
