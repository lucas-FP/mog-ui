import GameStatusEnum from '../util/GameConfigs/GameStatusEnum';
import { useRef, useEffect } from 'react';
//TODO think of using hooks instead of class

export default function useSocket(
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
  const timerRef = useRef();

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return {
    listen() {
      socket.on('entered', (data) => onEnter && onEnter(data));
      socket.on('enterSlot', (data) => onEnterSlot && onEnterSlot(data));
      socket.on('left', (data) => onLeave && onLeave(data));
      socket.on('customError', (data) => onError && onError(data));
      socket.on('gamePushed', (data) => onGameChange && onGameChange(data));
      socket.on('gameState', (data) => {
        onGameStateChange && onGameStateChange(data.gameData);
      });
      socket.on('quitted', (data) => {
        onLeave(data);
        onQuit(data);
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
        onMessage && onMessage(data.messageList);
        onEnter && onEnter(data.connectedUsers);
        onGameChange && onGameChange(data.gamesList);
        onGameStateChange && onGameStateChange(data.gameData);
        onEnterSlot && onEnterSlot(data.playerSlots);
      });
    },

    enter() {
      socket.emit('enter', { roomId: roomId, gameId: gameId });
      timerRef.current = setInterval(
        () => socket.emit('enter', { roomId: roomId, gameId: gameId }),
        5000
      );
    },
    leave() {
      socket.emit('leave', { roomId: roomId, gameId: gameId });
      socket.disconnect();
    },
    sendMessage(message) {
      socket.emit('pushMessage', {
        roomId: roomId,
        gameId: gameId,
        message,
      });
    },
    createGame(gameCode, gameConfig) {
      socket.emit('pushGame', {
        roomId: roomId,
        gameCode,
        gameConfig,
      });
    },
    sendAction(action) {
      socket.emit('pushAction', {
        roomId: roomId,
        gameId: gameId,
        action,
      });
    },
    startGame() {
      socket.emit('startGame', {
        roomId: roomId,
        gameId: gameId,
      });
    },
    restartGame() {
      socket.emit('restartGame', {
        roomId: roomId,
        gameId: gameId,
      });
    },
    quitGame() {
      socket.emit('quit', { roomId: roomId, gameId: gameId });
      socket.disconnect();
    },
  };
}
