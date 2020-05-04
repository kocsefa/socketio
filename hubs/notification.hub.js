module.exports = function (io) {
  const nsp = io.of('/notification')
  return nsp
}
