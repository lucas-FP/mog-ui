import React from 'react';
import { Router } from '@reach/router';
import Login from './pages/Login';
import Room from './pages/Room';
import RoomsList from './pages/RoomsList';
import Home from './pages/Home';
import RoomLogin from './pages/RoomLogin';
import GameRenderer from './pages/GameRenderer';
import NotFound from './pages/NotFound';
import { ThemeProvider } from 'styled-components';
import theme from './styling/theme';
import GlobalStyle from './styling/GlobalStyle';

//TODO setup enviroment variables

function App() {
  return (
    <ThemeProvider theme={theme || {}}>
      <Router>
        <NotFound default />
        <Home path="/" />
        <Login path="/login" />
        <RoomsList path="/list" />
        <Room path="/room/:roomId" />
        <RoomLogin path="/room/:roomId/login" />
        <GameRenderer path={`/room/:roomId/:gameCode/:gameId`} />
      </Router>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
