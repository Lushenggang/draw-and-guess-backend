module.exports = {
  C2S_LOGIN: 1, // 进入大厅
  C2S_ENTER_ROOM: 2, // 进入房间
  C2S_START: 3, // 房主开始游戏

  S2C_LOGIN: 1, // 返回用户信息
  S2C_ROOM_LIST: 2, // 同步大厅房间列表
  S2C_ROOM_INFO: 3, // 同步房间信息
}

