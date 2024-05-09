import adonisServer from '@adonisjs/core/services/server'
import { Server } from 'socket.io'
import env from './env.js'

const io = new Server(adonisServer.getNodeServer())
var ComputerClients: { [name: string]: string } = {}
var MiscClients = new Set<string>()
var DashboardClients = new Set<string>()
var SignUpClients = new Set<string>()
var Computers = env.get('COMPUTERS')?.split(', ')
var NetLoggedInUser = 'No one'

io.on('connection', (socket) => {
  socket.onAny((event, data) => {
    if (event === 'Name') {
      if (data.Name === 'Dashboard') {
        DashboardClients.add(socket.id)
        socket.emit('Monitor', { name: 'Piran', netLoggedIn: NetLoggedInUser })
      } else if (Computers?.includes(data.Name)) {
        ComputerClients[data.Name] = socket.id
      } else if (data.Name === 'SignUp') {
        SignUpClients.add(socket.id)
      } else {
        MiscClients.add(socket.id)
      }
      socket.emit('NameAccepted')
      return
    }
    if (event === 'Monitor') {
      if (data.name === 'Piran') NetLoggedInUser = data.netLoggedIn
      DashboardClients.forEach((client) => {
        io.to(client).emit(event, data)
      })
      return
    }
    if (typeof ComputerClients[data.To] === 'undefined') {
      var outData = data
      outData.From = socket.id
      io.to(data.To).emit(event, outData)
    } else {
      var outData = data
      outData.From = socket.id
      io.to(ComputerClients[data.To]).emit(event, outData)
    }
  })

  socket.on('disconnect', function () {
    try {
      DashboardClients.delete(socket.id)
      SignUpClients.delete(socket.id)
      MiscClients.delete(socket.id)
      for (const [key, value] of Object.entries(ComputerClients)) {
        if (value === socket.id) delete ComputerClients[key]
      }
    } catch (e) {
      return
    }
  })
})
