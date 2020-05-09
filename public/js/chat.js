// Bu şekilde bağlanacaksın hub'a
var chatHub = io('/chathub')
var notificationHub = io('/notificationhub')

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

function sendmessage() {
  chatHub.emit('message', { msg: $('#name').val() })
}
