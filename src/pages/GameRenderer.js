import React from 'react';
import GameCodeEnum from '../util/GameConfigs/GameCodeEnum';
import ConnectGame from './games/ConnectGame';

export default function GameRenderer({ gameCode, ...props }) {
  switch (gameCode) {
    case GameCodeEnum.CONNECT:
      return <ConnectGame {...props} />;
    default:
      return <h1>Unrecognized game code</h1>;
  }
}
