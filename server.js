const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = 3000

const path = require('path')
const bodyParser = require('body-parser')

// Modellerin oluşturulduğundan emin olmak için ilk başta import edilebilir.
const messageService = require('./services/chat.service')
const userService = require('./services/user.service')

// En hiçbirine ihtiyaç duymadandan en fazlasına ihtiyaç duyana göre import et.
const chatHub = require('./hubs/chat.hub')(io)
const notificationHub = require('./hubs/notification.hub')(io)

const chatRouter = require('./routes/chat.route')
const userRouter = require('./routes/user.route')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')

// Message router'ına message service'i inject etmiş olduk.
app.use('/chat', chatRouter(
    { messageService },
    { chatHub }
))

// Message router'ına message service'i, chatHub'ı ve notificationHub'ı inject
// etmiş olduk.
app.use('/users', userRouter(
    { userService },
    { chatHub, notificationHub }
))

// Kendi route'una al.
app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})

server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})

// io.on('connection', (socket) => {
//     socket
//         .on("connect", (data) => {
//             console.log(`Connected ${data}`)
//         })
//         .on("connect_error", (error) => {
//             console.log(`Connection Error: ${error.toString()}`)
//         })
//         .on("error", (error) => {
//             console.log(`Error: ${error.toString()}`)
//         })
//         .on("disconnect", (data) => {
//             console.log(`Disconnect ${data}`)
//         })
//         .on("disconnecting", (data) => {
//             console.log(`Disconnecting ${data}`)
//         })
//         .on("reconnect_attempt", () => {
//             console.log("Reconnect Attempt")
//         })
//         .on("reconnecting", () => {
//             console.log("Reconnecting...")
//         })
//         .on("reconnect_error", (error) => {
//             console.log(`Reconnect Error: ${error.toString()}`)
//         })
//         .on("reconnect_failed", (error) => {
//             console.log(`Reconnect Failed: ${error.toString()}`)
//         })
//         .on("newListener", (error) => {
//             console.log(`New Listenerx: ${error.toString()}`)
//         }).on('message', (from, data) => {
//             console.log(from + data)
//         })
// })
