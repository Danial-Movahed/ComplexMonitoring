import adonisServer from '@adonisjs/core/services/server'
import { Server } from 'socket.io'

const io = new Server(adonisServer.getNodeServer())
var Clients: { [name: string]: string | Set<string> } = {}
Clients['Frontend'] = new Set<string>()

io.on('connection', (socket) => {
  socket.onAny((event, data) => {
    if (event === 'Name') {
      if (data.Name == 'Frontend') {
        (Clients['Frontend'] as Set<string>).add(socket.id)
      } else {
        Clients[data.Name] = socket.id
      }
      console.log(Clients)
      socket.emit('NameAccepted')
      return
    }
    (Clients["Frontend"] as Set<string>).forEach(element => {
      io.to(element).emit(event, data)
    });
  })
})
