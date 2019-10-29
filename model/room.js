const uuid = require('uuid/v4')

const ROOM_SIZE = 8
const ROOM_STATE_READY = 1
const ROOM_STATE_GAMING = 2

class CRoom {
  constructor (pid) {
    this.owner = pid
    this.playerList = [pid]
    this.game = null
  }
  enterRoom (pid) {
    if (this.playerList.length < ROOM_SIZE) {
      this.playerList.push(pid)
      return true
    }
    return false
  }
  leaveRoom (pid) {
    if (this.game) {
      this.game.leaveGame()
    }
    let idx = this.playerList.indexOf(pid)
    idx !== -1 && this.playerList.splice(idx)
  }
}

class CRoomManager {
  constructor () {
    this.roomList = {}
  }
  getRoom (rid) {
    return this.roomList[rid]
  }
  createRoom (pid) {
    return new Room(pid)
  }
}

module.exports = {
  CRoomManager
}