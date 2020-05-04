module.exports = io => {
  const nsp = io.of('/chat')

  // Connection'ı yakala.
  nsp.on('connect', socket => {
    console.log(socket.id)

    // Diğer tüm event'leri connect'in içinde yap.
    // socket.on ile birlikte

    socket.on('chattername', name => {
      console.log(`New chat user ${name}`)
    })

    socket.on('message', payload => {
      console.log(`New message ${payload}`)

      nsp.emit('message', payload)
    })
  })

  return nsp
}
