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

const VictoryText = styled.h2``;

const renderMap = {
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

export default function ConnectRoom({ roomId, gameId }) {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [gameState, setGameState] = useState({});

  const socketRef = useRef();
  socketRef.current = socketClient(
    process.env.NODE_ENV === 'production'
      ? 'https://desolate-mesa-14660.herokuapp.com/games'
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
    console.log('enter', user);
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
    console.log('left', user);
    setConnectedUsers((users) => users.filter((u) => u.id !== user.id));
  };

  const onGameStateChange = (gameState) => {
    console.log(gameState);
    setGameState((actualState) => {
      return { ...actualState, ...gameState };
    });
  };

  const gameSocket = SocketService(
    socketRef.current,
    { roomId, gameId },
    {
      onError,
      onLeave,
      onEnter,
      onGameStateChange,
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
    return connectedUsers.map((u) => {
      if (gameState && gameState.turnPlayer && gameState.turnPlayer.id === u.id)
        return '->' + (u.nick || u.userName);
      else return u.nick || u.userName;
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
            renderMap={renderMap}
            onClick={processAction}
            gridData={gameState.grid}
          />
        </GridSizer>
      </GameBox>
    </RoomWrapper>
  );
}
