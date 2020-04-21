import GameStatusEnum from '../util/GameConfigs/GameStatusEnum';

export default function SocketService(
  socket,
  { roomId, gameId },
  { onMessage, onError, onEnter, onLeave, onGameChange, onGameStateChange }
) {
  return {
    listen() {
      socket.on('entered', (data) => onEnter && onEnter(data));
      socket.on('left', (data) => onLeave && onLeave(data));
      socket.on('customError', (data) => {
        console.log(data);
        onError && onError(data);
      });
      socket.on('gamePushed', (data) => onGameChange && onGameChange(data));
      socket.on('gameState', (data) => {
        onGameStateChange && onGameStateChange(data.gameData);
      });
      socket.on(
        'gameStarted',
        () =>
          onGameStateChange &&
          onGameStateChange({ gameStatus: GameStatusEnum.ONGOING })
      );
      socket.on('messagePushed', (data) => {
        onMessage && onMessage(data);
      });
      socket.on('roomData', (data) => {
        console.log(data);
        onMessage && onMessage(data.messageList);
        onEnter && onEnter(data.connectedUsers);
        onGameChange && onGameChange(data.gamesList);
        onGameStateChange && onGameStateChange(data.gameData);
      });
    },

    enter() {
      socket.emit('enter', { roomId, gameId });
    },
    leave() {
      socket.emit('leave', { roomId, gameId });
      socket.disconnect();
    },
    sendMessage(message) {
      socket.emit('pushMessage', { roomId, gameId, message });
    },
    createGame(gameCode, gameConfig) {
      socket.emit('pushGame', { roomId, gameCode, gameConfig });
    },
    sendAction(action) {
      socket.emit('pushAction', { roomId, gameId, action });
    },
    startGame() {
      socket.emit('startGame', { roomId, gameId });
    },
    restartGame() {
      socket.emit('restartGame', { roomId, gameId });
    },
  };
}
