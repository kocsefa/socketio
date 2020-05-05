module.exports = io => {
  const nsp = io.of('/chat')

  // Connection'ı yakala.
  nsp.on('connect', socket => {
    console.log(socket.id)
  })

  return nsp
}
