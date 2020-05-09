function signIn() {
  let body = {
    username: document.querySelector('#username').value,
    password: document.querySelector('#password').value
  }
  axios({
    method: 'post',
    url: '/login',
    data: body
  }).then(res => {
    document.cookie =`token = ${res.data}`
    window.location.replace('/chat')
  }).catch(function (error) {
    console.log(error);
  })

}
function signUp() {

  console.log('signUp')

}