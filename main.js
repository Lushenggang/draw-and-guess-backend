const ws = require('nodejs-websocket')
const protocol = require('./protocol.js')
const CPlayerManager = require('./model/player').CPlayerManager
const CRoomManager = require('./model/room').CRoomManager

class CManager {
  constructor () {
    this.socket = null
    this.connectList = {}
    this.protocolList = {}
    this.playerMgr = new CPlayerManager()
    this.roomMgr = new CRoomManager()
  }

  init () {
    for (let key in protocol) {
      this[key] = protocol[key]
    }
    this.socket = ws.createServer(connect => {
      connect.on('text', result => {
        console.log('收到消息', result)
        this.parseProtocol(result, connect)
      })
      connect.on('connect', code => {
        console.log('开启连接', code)
      })
      connect.on('close', code => {
        let playerId
        for (let pid in this.connectList) {
          if (connect === this.connectList[pud]) {
            playerId = pid
            break
          }
        }
        this.playerMgr.removePlayer(playerId)
        delete this.connectList[playerId]
        console.log('用户下线', playerId)
      })
      connect.on('error', code => {
        // console.log('error', code)
      })
    }).listen(4999)
    this.initProtocolList()
  }
  parseProtocol (sData, connect) {
    let { protocol, data } = JSON.parse(sData)
    let handler = this.protocolList[protocol]
    handler && handler.call(this, data, connect)
  }
  initProtocolList () {
    this.protocolList = {
      [this.C2S_LOGIN]: this.login,
      [this.C2S_ENTER_ROOM]: this.enterRoom,
      [this.C2S_START]: this.startGame
    }
  }
  S2CMessage (pid, protocol, data) {
    let info = JSON.stringify({ protocol, data })
    let connect = this.connectList[pid]
    connect.sendText(info)
  }
  login (pid, connect) {
    let player = this.playerMgr.loadPlayer(pid)
    this.connectList[player.id] = connect
    this.S2CMessage(player.id, this.S2C_LOGIN, player.info())
  }
  enterRoom (data) {

  }
  startGame (data) {

  }
}

let manager = new CManager()
manager.init()
