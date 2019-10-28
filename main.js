const ws = require('nodejs-websocket')

class CManager {
  constructor () {
    this.socket = null
    this.connectList = {}
  }

  init () {
    this.socket = ws.createServer(connect => {
      connect.on('text', result => {
        console.log('发送消息', result)
        this.parseProtocol(result)
      })
      connect.on('connect', code => {
        console.log('开启连接', code)
      })
      connect.on('close', code => {
        console.log('close', code)
      })
      connect.on('error', code => {
        console.log('error', code)
      })
    }).listen(4999)
  }
  parseProtocol (data) {
    // 
  }
}

let manager = new CManager()
manager.init()
