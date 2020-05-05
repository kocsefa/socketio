module.exports = function (io) {
  const nsp = io.of('/notification')
  nsp.on('connect', socket => {
    console.log(socket.id)
  })
  return nsp
}
