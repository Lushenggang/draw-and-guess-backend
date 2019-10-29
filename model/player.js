const uuid = require('uuid/v4')

class CPlayer {
  constructor () {
    this.id = uuid()
    this.avatar = ''
    this.username = ''
  }
  enterRoom (rid) {
    // 
  }
  info () {
    return {
      id: this.id,
      avatar: this.avatar,
      username: this.username
    }
  }
}

class CPlayerManager {
  constructor () {
    this.playerList = {}
  }
  createPlayer () {
    let player = new CPlayer()
    this.playerList[pid] = player
    return player
  }
  loadPlayer (pid) {
    return this.playerList[pid] || this.createPlayer()
  }
  removePlayer (pid) {
    if (this.playerList[pid]) delete this.playerList[pid]
  }
}

module.exports = {
  CPlayerManager
}