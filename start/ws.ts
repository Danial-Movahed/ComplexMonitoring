import adonisServer from '@adonisjs/core/services/server'
import { Server } from 'socket.io'

const io = new Server(adonisServer.getNodeServer())

io.on('connection', (socket) => {
  socket.emit('msgFromBE', { hello: 'from BE' })

  socket.on('msgFromFE', (data) => {
    console.log('msgFromFE', data)
  })
})
