// Bu şekilde bağlanacaksın hub'a
var chatHub = io('/chat')

var notificationHub = io('/notification')
notificationHub.on('notification', function (payload) {
  console.log(payload)
})

chatHub.on('new message', function (payload) {
  console.log(payload)
})

function kaydet(){
  // chatHub.emit('chattername', $('#name').val())
  chatHub.emit('message', $('#name').val())

  console.log('clicked')
  //burdan soket ile gidiyo mesaj ama göçe gidiyo yakalayamıyom
}
