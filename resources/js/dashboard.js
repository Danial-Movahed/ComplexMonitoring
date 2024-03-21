const socket = io()

socket.on('msgFromBE', (data) => {
  console.log('msgFromBE', data)
  socket.emit('msgFromFE', { hello: 'from FE' })
})
