module.exports = io => {
  const nsp = io.of('/chathub')

  // Connection'ı yakala.
  nsp.on('connect', socket => {
    console.log(socket.id)

    socket.on('message', payload => {
      nsp.emit('message', payload)
    })

  })

  return nsp
}
