module.exports = function (io) {
  const nsp = io.of('/notificationhub')
  nsp.on('connect', socket => {
    console.log(socket.id)
  })
  return nsp
}
