const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = 3000
///////////////////////////////////
const path = require('path')
const bodyParser = require('body-parser')

server.listen(port,()=> { 
    console.log(`Server started on http://localhost:${port}`)
})

const messageService = require('./services/message.service')
const messageRouter = require('./routes/message.route')
const userService = require('./services/user.service')
const userRouter = require('./routes/user.route')


// Message router'ına message service'i inject etmiş olduk.
app.use('/messages', messageRouter(messageService))
app.use('/users',userRouter(userService))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next)=>{ res.locals['socketio'] = io; next(); })
app.set('view engine', 'pug')

app.get('/',(req,res)=>{
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})



io.on('connection', (socket) => {
    socket
        .on("connect", (data) => {
            console.log(`Connected ${data}`)
        })
        .on("connect_error", (error) => {
            console.log(`Connection Error: ${error.toString()}`)
        })
        .on("error", (error) => {
            console.log(`Error: ${error.toString()}`)
        })
        .on("disconnect", (data) => {
            console.log(`Disconnect ${data}`)
        })
        .on("disconnecting", (data) => {
            console.log(`Disconnecting ${data}`)
        })
        .on("reconnect_attempt", () => {
            console.log("Reconnect Attempt")
        })
        .on("reconnecting", () => {
            console.log("Reconnecting...")
        })
        .on("reconnect_error", (error) => {
            console.log(`Reconnect Error: ${error.toString()}`)
        })
        .on("reconnect_failed", (error) => {
            console.log(`Reconnect Failed: ${error.toString()}`)
        })
        .on("newListener", (error) => {
            console.log(`New Listenerx: ${error.toString()}`)
        }).on('message', (from, data) => {
            console.log(from + data)
        })
})