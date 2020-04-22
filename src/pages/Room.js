import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { navigate, Link } from '@reach/router';
import socketClient from 'socket.io-client';
import useBeforeUnload from '../hooks/useBeforeUnload';
import { List, Input, Button, Message } from '../components';
import SocketService from '../services/SocketService';
import GameCodeEnum from '../util/GameConfigs/GameCodeEnum';

const RoomWrapper = styled.div`
  display: flex;
`;
const ChatBox = styled.div`
  flex: 3;
`;
const GameBox = styled.div`
  flex: 1;
`;

const GamesList = styled(List)``;
const MessageList = styled(List)``;
const UserList = styled(List)`
  flex: 1;
`;

const InputForm = styled.form``;
const ChatInput = styled(Input)``;
const SendButton = styled(Button)``;

const NewGameButton = styled(Button)``;

export default function Room({ roomId }) {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [activeGames, setActiveGames] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [creatingNewGame, setCreatingNewGame] = useState(false);
  const [newGameX, setNewGameX] = useState(3);
  const [newGameY, setNewGameY] = useState(3);
  const [newGameMaxPlayers, setNewGameMaxPlayers] = useState(2);
  const [newGameMinPlayers, setNewGameMinPlayers] = useState(2);
  const [newGameConnectSize, setNewGameConnectSize] = useState(3);
  const [newGameGravity, setNewGameGravity] = useState(false);

  const socketRef = useRef();
  //TODO remove hardcoded
  socketRef.current = socketClient(
    process.env.NODE_ENV === 'production'
      ? 'https://mog-backend.herokuapp.com/rooms'
      : 'http://localhost:3333/rooms'
  );

  const onError = (error) => {
    if (!error) return;
    console.log(error);
    if (error.status === 401) {
      navigate(`/login`);
    } else if (error.status === 403) {
      console.log(roomId);
      navigate(`/room/${roomId}/login`);
    } else window.alert(JSON.stringify(error));
  };

  const onMessage = (message) => {
    console.log(message);
    if (Array.isArray(message))
      setMessages((messages) => [...messages, ...message]);
    else setMessages((messages) => [...messages, message]);
  };

  const onEnter = (user) => {
    if (Array.isArray(user)) setConnectedUsers((users) => [...users, ...user]);
    else setConnectedUsers((users) => [...users, user]);
  };

  const onLeave = (user) => {
    setConnectedUsers((users) => users.filter((u) => u.id !== user.id));
  };

  const onGameChange = (game) => {
    console.log(game);
    if (Array.isArray(game)) setActiveGames((games) => [...games, ...game]);
    else setActiveGames((games) => [...games, game]);
  };

  let roomSocket = SocketService(
    socketRef.current,
    { roomId },
    {
      onError,
      onLeave,
      onMessage,
      onEnter,
      onGameChange,
    }
  );

  const handleSendClick = (evt) => {
    evt.preventDefault();
    roomSocket.sendMessage(newMessage);
    setNewMessage('');
  };

  const handleNewGameButton = async () => {
    //TODO make generic form based on default data
    // const gameDefaults = (
    //   await GameService.getDefaultConfig(GameCodeEnum.CONNECT)
    // ).data;
    setCreatingNewGame(true);
    //
  };

  const HandleGameSubmit = (evt) => {
    evt.preventDefault();
    setCreatingNewGame(false);
    roomSocket.createGame(GameCodeEnum.CONNECT, {
      xSize: newGameX,
      ySize: newGameY,
      maxPlayers: newGameMaxPlayers,
      minPlayers: newGameMinPlayers,
      connectSize: newGameConnectSize,
      gravity: newGameGravity,
    });
  };

  useEffect(() => {
    roomSocket.listen();
    roomSocket.enter();
    return () => {
      roomSocket.leave();
    };
  }, []);

  useBeforeUnload(() => {
    roomSocket.leave();
  });

  const renderUserBoxes = () => {
    return connectedUsers.map((u) => u.nick || u.userName);
  };

  const renderMessages = () => {
    return messages.map((m, i) => <Message message={m} key={i} />);
  };

  const renderGames = () => {
    return activeGames.map((g) => (
      <Link
        id={g.gameData.id}
        key={g.gameData.id}
        to={`/room/${roomId}/${g.gameData.gameCode}/${g.gameData.id}`}
      >
        {`${g.gameData.gameCode}#${g.gameData.id}`}
      </Link>
    ));
  };

  return (
    <RoomWrapper>
      <UserList title="Connected Users">{renderUserBoxes()}</UserList>
      <ChatBox>
        <MessageList title="Messages">{renderMessages()}</MessageList>
        <InputForm onSubmit={handleSendClick}>
          <ChatInput value={newMessage} onChange={setNewMessage} />
          <SendButton type="submit">SEND</SendButton>
        </InputForm>
      </ChatBox>
      <GameBox>
        <GamesList title="Room's Games">{renderGames()}</GamesList>
        {creatingNewGame ? (
          <form onSubmit={HandleGameSubmit}>
            <Input value={newGameX} type="number" onChange={setNewGameX}>
              X Size
            </Input>
            <Input value={newGameY} type="number" onChange={setNewGameY}>
              Y Size
            </Input>
            <Input
              value={newGameMaxPlayers}
              type="number"
              onChange={setNewGameMaxPlayers}
            >
              Maximum Players
            </Input>
            <Input
              value={newGameMinPlayers}
              type="number"
              onChange={setNewGameMinPlayers}
            >
              Minimum Players
            </Input>
            <Input
              value={newGameConnectSize}
              type="number"
              onChange={setNewGameConnectSize}
            >
              Connect Size
            </Input>
            <Input
              value={newGameGravity}
              type="checkbox"
              onChange={setNewGameGravity}
            >
              Gravity
            </Input>
            <Button type="submit">Criar</Button>
          </form>
        ) : (
          <NewGameButton onClick={handleNewGameButton}>
            Create new
          </NewGameButton>
        )}
      </GameBox>
    </RoomWrapper>
  );
}
