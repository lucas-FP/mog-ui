import GameStatusEnum from '../util/GameConfigs/GameStatusEnum';

//TODO think of using hooks instead of class

export default class SocketService {
  socket;
  roomId;
  gameId;
  onMessage;
  onError;
  onEnter;
  onLeave;
  onGameChange;
  onGameStateChange;
  onEnterSlot;
  onQuit;
  connnectionCheck;

  constructor(
    socket,
    { roomId, gameId },
    {
      onMessage,
      onError,
      onEnter,
      onLeave,
      onGameChange,
      onGameStateChange,
      onEnterSlot,
      onQuit,
    }
  ) {
    this.socket = socket;
    this.roomId = roomId;
    this.gameId = gameId;
    this.onMessage = onMessage;
    this.onError = onError;
    this.onEnter = onEnter;
    this.onLeave = onLeave;
    this.onGameChange = onGameChange;
    this.onGameStateChange = onGameStateChange;
    this.onEnterSlot = onEnterSlot;
    this.onQuit = onQuit;
    this.connnectionCheck = setInterval(() => {
      console.log(socket.connected);
    }, 5000);
  }

  listen() {
    this.socket.on('entered', (data) => this.onEnter && this.onEnter(data));
    this.socket.on(
      'enterSlot',
      (data) => this.onEnterSlot && this.onEnterSlot(data)
    );
    this.socket.on('left', (data) => this.onLeave && this.onLeave(data));
    this.socket.on('customError', (data) => this.onError && this.onError(data));
    this.socket.on(
      'gamePushed',
      (data) => this.onGameChange && this.onGameChange(data)
    );
    this.socket.on('gameState', (data) => {
      this.onGameStateChange && this.onGameStateChange(data.gameData);
    });
    this.socket.on('quitted', (data) => {
      this.onLeave(data);
      this.onQuit(data);
    });
    this.socket.on(
      'gameStarted',
      () =>
        this.onGameStateChange &&
        this.onGameStateChange({ gameStatus: GameStatusEnum.ONGOING })
    );
    this.socket.on('messagePushed', (data) => {
      this.onMessage && this.onMessage(data);
    });
    this.socket.on('roomData', (data) => {
      this.onMessage && this.onMessage(data.messageList);
      this.onEnter && this.onEnter(data.connectedUsers);
      this.onGameChange && this.onGameChange(data.gamesList);
      this.onGameStateChange && this.onGameStateChange(data.gameData);
      this.onEnterSlot && this.onEnterSlot(data.playerSlots);
    });
  }

  enter() {
    this.socket.emit('enter', { roomId: this.roomId, gameId: this.gameId });
  }
  leave() {
    this.socket.emit('leave', { roomId: this.roomId, gameId: this.gameId });
    this.socket.disconnect();
  }
  sendMessage(message) {
    this.socket.emit('pushMessage', {
      roomId: this.roomId,
      gameId: this.gameId,
      message,
    });
  }
  createGame(gameCode, gameConfig) {
    this.socket.emit('pushGame', { roomId: this.roomId, gameCode, gameConfig });
  }
  sendAction(action) {
    this.socket.emit('pushAction', {
      roomId: this.roomId,
      gameId: this.gameId,
      action,
    });
  }
  startGame() {
    this.socket.emit('startGame', { roomId: this.roomId, gameId: this.gameId });
  }
  restartGame() {
    this.socket.emit('restartGame', {
      roomId: this.roomId,
      gameId: this.gameId,
    });
  }
  quitGame() {
    this.socket.emit('quit', { roomId: this.roomId, gameId: this.gameId });
    this.socket.disconnect();
    clearInterval(this.connnectionCheck);
  }
}
