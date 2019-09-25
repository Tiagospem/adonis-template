'use strict'

class WsDemoController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onError () {
  }

  onClose () {
  }

  onMessage (data) {
    this.socket.broadcastToAll('message', data)
  }
}

module.exports = WsDemoController
