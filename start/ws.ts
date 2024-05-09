import adonisServer from '@adonisjs/core/services/server'
import { Server } from 'socket.io'

const io = new Server(adonisServer.getNodeServer())
var Clients: { [name: string]: string | Set<string> } = {}
Clients['Frontend'] = new Set<string>()
var NetLoggedInUser = "No one"

io.on('connection', (socket) => {
  socket.onAny((event, data) => {
    if (event === 'Name') {
      if (data.Name == 'Frontend') {
        (Clients['Frontend'] as Set<string>).add(socket.id)
        socket.emit("Monitor", {"name": "Piran", "netLoggedIn": NetLoggedInUser})
      } else {
        Clients[data.Name] = socket.id
      }
      console.log(Clients)
      socket.emit('NameAccepted')
      return
    }
    if (data.name === 'Piran') {
      NetLoggedInUser = data.netLoggedIn
    }
    (Clients["Frontend"] as Set<string>).forEach(element => {
      io.to(element).emit(event, data)
    });
  })
  socket.on('disconnect', function() {
    (Clients["Frontend"] as Set<string>).delete(socket.id)
  })
})
