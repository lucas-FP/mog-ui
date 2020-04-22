import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import socketClient from 'socket.io-client';
import useBeforeUnload from '../../hooks/useBeforeUnload';
import { List, GameGrid, Button } from '../../components';
import SocketService from '../../services/SocketService';
import GameStatus from '../../util/GameConfigs/GameStatusEnum';
import { uniqueKeyFilter } from '../../util/Generic';

const RoomWrapper = styled.div`
  heigth: 100vh;
  width: calc(100vw - 16px);
  display: flex;
`;

const InfoBox = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
`;

const UserList = styled(List)``;

const GameBox = styled.div`
  width: calc(100vw - 166px);
  display: flex;
  justify-content: center;
`;

const GridSizer = styled.div`
  width: calc(100vw - 200px);
  display: flex;
  height: calc(
    ${(props) => (100 * props.ySize) / props.xSize}vw -
      ${(props) => (200 * props.ySize) / props.xSize}px
  );
  max-height: 95vh;
  max-width: ${(props) => (95 * props.xSize) / props.ySize}vh;
`;

const ColorBox = styled.div`
  background: ${(props) => props.color};
  width: 100%;
  height: 100%;
`;

const ColorName = styled.span`
  color: ${(props) => props.color};
  font-weigth: bold;
`;

const VictoryText = styled.h2``;

//TODO think of better way to do this, not using 2 rendermaps
const renderBoxMap = {
  '0': <ColorBox color={'blue'} />,
  '1': <ColorBox color={'red'} />,
  '2': <ColorBox color={'green'} />,
  '3': <ColorBox color={'yellow'} />,
  '4': <ColorBox color={'purple'} />,
  '5': <ColorBox color={'deeppink'} />,
  '6': <ColorBox color={'orange'} />,
  '7': <ColorBox color={'black'} />,
  '8': <ColorBox color={'brown'} />,
  '9': <ColorBox color={'cyan'} />,
  '10': <ColorBox color={'lawngreen'} />,
  '11': <ColorBox color={'gray'} />,
};

const renderNameMap = (text, i, id) => {
  switch (i) {
    case 0:
      return (
        <ColorName key={id} color={'blue'}>
          {text}
        </ColorName>
      );
    case 1:
      return (
        <ColorName key={id} color={'red'}>
          {text}
        </ColorName>
      );
    case 2:
      return (
        <ColorName key={id} color={'green'}>
          {text}
        </ColorName>
      );
    case 3:
      return (
        <ColorName key={id} color={'yellow'}>
          {text}
        </ColorName>
      );
    case 4:
      return (
        <ColorName key={id} color={'purple'}>
          {text}
        </ColorName>
      );
    case 5:
      return (
        <ColorName key={id} color={'deeppink'}>
          {text}
        </ColorName>
      );
    case 6:
      return (
        <ColorName key={id} color={'orange'}>
          {text}
        </ColorName>
      );
    case 7:
      return (
        <ColorName key={id} color={'black'}>
          {text}
        </ColorName>
      );
    case 8:
      return (
        <ColorName key={id} color={'brown'}>
          {text}
        </ColorName>
      );
    case 9:
      return (
        <ColorName key={id} color={'cyan'}>
          {text}
        </ColorName>
      );
    case 10:
      return (
        <ColorName key={id} color={'lawngreen'}>
          {text}
        </ColorName>
      );
    case 11:
      return (
        <ColorName key={id} color={'gray'}>
          {text}
        </ColorName>
      );
    default:
      return (
        <ColorName key={id} color={'gray'}>
          {text}
        </ColorName>
      );
  }
};

export default function ConnectRoom({ roomId, gameId }) {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [userSlots, setUserSlots] = useState([]);
  const [gameState, setGameState] = useState({});

  const socketRef = useRef();
  socketRef.current = socketClient(
    process.env.NODE_ENV === 'production'
      ? 'https://mog-backend.herokuapp.com/games'
      : 'http://localhost:3333/games'
  );

  const onError = (error) => {
    console.log(error);
    if (!error) return;

    if (error.status === 401) {
      navigate(`/login`);
    } else if (error.status === 403) {
      navigate(`/room/${roomId}/login`);
    } else window.alert(JSON.stringify(error));
  };

  const onEnter = (user) => {
    if (Array.isArray(user))
      setConnectedUsers((users) =>
        [...users, ...user].filter(uniqueKeyFilter('id'))
      );
    else
      setConnectedUsers((users) =>
        [...users, user].filter(uniqueKeyFilter('id'))
      );
  };

  const onLeave = (user) => {
    setConnectedUsers((users) => users.filter((u) => u.id !== user.id));
  };

  const onGameStateChange = (gameState) => {
    setGameState((actualState) => {
      return { ...actualState, ...gameState };
    });
  };

  const onGameSlotChange = (gameSlots) => {
    setUserSlots(gameSlots);
  };

  const gameSocket = SocketService(
    socketRef.current,
    { roomId, gameId },
    {
      onError,
      onLeave,
      onEnter,
      onGameStateChange,
      onGameSlotChange,
    }
  );

  const processAction = ([x, y]) => {
    gameSocket.sendAction({ x: x, y: y });
  };

  useEffect(() => {
    gameSocket.listen();
    gameSocket.enter();
    return () => {
      gameSocket.leave();
    };
  }, []);

  useBeforeUnload(() => {
    gameSocket.leave();
  });

  const renderUserBoxes = () => {
    return userSlots.map((u, i) => {
      if (gameState && gameState.turnPlayer && gameState.turnPlayer.id === u.id)
        return renderNameMap('->' + (u.nick || u.userName), i, u.id);
      else return renderNameMap(u.nick || u.userName, i, u.id);
    });
  };

  const ySize = (gameState.grid && gameState.grid.length) || 0;
  const xSize = (ySize && gameState.grid[0].length) || 0;

  return (
    <RoomWrapper>
      <InfoBox>
        <UserList title="Connected Users">{renderUserBoxes()}</UserList>
        {gameState.victoryPlayer && (
          <VictoryText>
            {gameState.victoryPlayer.id
              ? (gameState.victoryPlayer.nick ||
                  gameState.victoryPlayer.userName) + ' wins'
              : gameState.victoryPlayer.msg}
          </VictoryText>
        )}
        {gameState.gameStatus === GameStatus.NOT_STARTED && (
          <Button onClick={() => gameSocket.startGame()}>Start Game</Button>
        )}
        {gameState.gameStatus === GameStatus.FINISHED && (
          <Button onClick={() => gameSocket.restartGame()}>Restart</Button>
        )}
      </InfoBox>
      <GameBox>
        <GridSizer xSize={xSize} ySize={ySize}>
          <GameGrid
            renderMap={renderBoxMap}
            onClick={processAction}
            gridData={gameState.grid}
          />
        </GridSizer>
      </GameBox>
    </RoomWrapper>
  );
}
