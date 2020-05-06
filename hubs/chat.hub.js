module.exports = io => {
  const nsp = io.of('/chat')

  // Connection'ı yakala.
  nsp.on('connect', socket => {
    console.log(socket.id)

    socket.on('message', payload => {
      console.log((socket.onevent).toString())
      nsp.emit('message', payload)
    })

  })

  return nsp
}
