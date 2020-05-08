const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = 3000

const bodyParser = require('body-parser')
const authCheck = require('./controllers/authCheck')

// Modellerin oluşturulduğundan emin olmak için ilk başta import edilebilir.
const messageService = require('./services/chat.service')
const userService = require('./services/user.service')

// En hiçbirine ihtiyaç duymadandan en fazlasına ihtiyaç duyana göre import et.
const chatHub = require('./hubs/chat.hub')(io)
const notificationHub = require('./hubs/notification.hub')(io)

const chatRouter = require('./routes/chat.route')
const indexRouter = require('./routes/index.route')
const loginRouter = require('./routes/login.route')
const userRouter = require('./routes/user.route')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')



// Message router'ına message service'i inject etmiş olduk.
app.use('/chat', authCheck, chatRouter(
  { messageService },
  { chatHub }
))

app.use('/', loginRouter(
  { userService },
  { chatHub, notificationHub }
))
// app.use('/', indexRouter())

// Message router'ına message service'i, chatHub'ı ve notificationHub'ı inject
// etmiş olduk.
app.use('/users', userRouter(
  { userService },
  { chatHub, notificationHub }
))

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})