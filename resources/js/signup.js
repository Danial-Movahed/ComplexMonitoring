import { io } from 'socket.io-client'


var Name = "SignUp"
const socket = io()
socket.emit('Name', { Name: Name })

var ComputerUsernameState = {}
window.edgeVariables.Computers.forEach((computer) => {
  ComputerUsernameState[computer] = false
})
socket.on('RespUsernameAvailability', (data) => {
  ComputerUsernameState[data.name] = data.state
  if (data.state) {
        document.getElementById('UnixUsernameAvailability' + data.name).innerHTML =
      '<i class="fa-solid fa-check"></i>'
    return
  }
  document.getElementById('UnixUsernameAvailability' + data.name).innerHTML =
    '<i class="fa-solid fa-xmark"></i>'
})

function CheckUnixUsernameAvailability() {
  for(var i=0; i<window.edgeVariables.Computers.length; i++)
    if (ComputerUsernameState[window.edgeVariables.Computers[i]] === false) return -1
  return 0
}

function UnixUsernameChanged() {
  window.edgeVariables.Computers.forEach((computer) => {
    document.getElementById('UnixUsernameAvailability' + computer).innerHTML = '?'
    ComputerUsernameState[computer] = false
    document.getElementById('UnixUsername' + computer).value =
      document.getElementById('UnixUsername').value
    socket.emit('CheckUsernameAvailability', {
      To: computer,
      username: document.getElementById('UnixUsername' + computer).value,
    })
  })
}

function UnixUsernameChangedComputer(SysName) {
  document.getElementById('UnixUsernameAvailability' + SysName).innerHTML = '?'
  ComputerUsernameState[SysName] = false
  socket.emit('CheckUsernameAvailability', {
    To: SysName,
    username: document.getElementById('UnixUsername' + SysName).value,
  })
}

function SignUp() {
  $('#UnixUsernameAvailabilityError').addClass('invisible')
  var val = CheckUnixUsernameAvailability()
  console.log(ComputerUsernameState)
  console.log(val)
  if (val != 0) {
    $('#UnixUsernameAvailabilityError').removeClass('invisible')
    var windowHeight = $(window).height()
    $('html, body').animate(
      {
        scrollTop: $('#UnixUsernameAvailabilityTable').offset().top - windowHeight / 2,
      },
      700
    )
    return false
  }
  return true
}

window.CheckUnixUsernameAvailability = CheckUnixUsernameAvailability
window.UnixUsernameChanged = UnixUsernameChanged
window.UnixUsernameChangedComputer = UnixUsernameChangedComputer
window.SignUp = SignUp
