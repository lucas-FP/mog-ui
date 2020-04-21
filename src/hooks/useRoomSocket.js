import { useRef, useState, useEffect } from 'react';
import socketClient from 'socket.io-client';
import useBeforeUnload from './useBeforeUnload';

export default function useRoomSocket(
  roomId,
  { onReceive, onError, onEnter, onLeave }
) {
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const entered = useRef();
  const socketRef = useRef();

  useBeforeUnload(() => {
    if (entered.current) socketRef.current.emit('leave', { roomId });
  }, true);

  useEffect(() => {
    entered.current = false;
    socketRef.current = socketClient(
      process.env.NODE_ENV === 'production'
        ? 'https://desolate-mesa-14660.herokuapp.com/rooms'
        : 'http://localhost:3333/rooms'
    );
    socketRef.current.emit('enter', { roomId });

    socketRef.current.on('roomData', (data) => {
      entered.current = true;
      setMessages(() => data.messageList);
      setConnectedUsers(() => data.connectedUsers);
    });

    socketRef.current.on('entered', (data) => onEnter && onEnter(data));
    socketRef.current.on('left', (data) => onLeave && onLeave(data));
    socketRef.current.on('customError', (data) => onError && onError(data));
    socketRef.current.on('messagePushed', (data) => {
      onReceive && onReceive(data);
      setMessages((events) => [...events, data]);
    });
  });

  const sendEvent = (message) => {
    socketRef.current.emit('pushMessage', message);
  };

  return [connectedUsers, messages, sendEvent];
}
