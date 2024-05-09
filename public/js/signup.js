import { io } from 'socket.io-client'

const socket = io()
socket.emit('Name', { Name: 'Frontend' })

function CheckUnixUsernameAvailability() {
  socket.emit("")
  return -1
}

function UnixUsernameChanged() {
  edgeVariables.Computers.forEach((computer) => {
    document.getElementById('UnixUsernameAvailability' + computer).innerHTML = '?'
    document.getElementById('UnixUsername' + computer).value =
      document.getElementById('UnixUsername').value
  })
}

function UnixUsernameChangedComputer(SysName) {
  document.getElementById('UnixUsernameAvailability' + SysName).innerHTML = '?'
}

function SignUp() {
  $('#UnixUsernameAvailabilityError').addClass('invisible')
  var val = CheckUnixUsernameAvailability()
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
