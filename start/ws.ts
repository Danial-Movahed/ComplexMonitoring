import adonisServer from '@adonisjs/core/services/server'
import { Server } from 'socket.io'

const io = new Server(adonisServer.getNodeServer())
var Clients: { [name: string]: string } = {}

io.on('connection', (socket) => {
  socket.onAny((event, data) => {
    if (event === 'Name') {
      Clients[data.Name] = socket.id
      console.log(Clients)
      socket.emit("NameAccepted")
      return
    }
    if (!Clients["Frontend"]) {
      return
    }
    io.to(Clients["Frontend"]).emit(event, data)
  })
})
