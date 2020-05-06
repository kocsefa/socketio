// Bu şekilde bağlanacaksın hub'a
var chatHub = io('/chat')
var notificationHub = io('/notification')

notificationHub.on('notification', function (payload) {
  console.log(payload)
})
  // .on('connect', () => {
  //   console.log(`NotificationHubConnected`)
  // })

chatHub.on('message', function (payload) {
  console.log(payload)
})
  // .on('connect', () => {
  //   console.log(`ChatHubConnected`)
  // })

function kaydet() {
  //    Bu akm mesajı sunucuya emitleniyo
  chatHub.emit('message', { msg: $('#name').val() })
}
