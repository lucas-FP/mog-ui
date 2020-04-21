import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input } from '../components';
import RoomsService from '../services/RoomsService';
import { navigate } from '@reach/router';

const LoginWrapper = styled.div``;

export default function RoomLogin({ roomId }) {
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      await RoomsService.enterRoom(roomId, password);
      navigate(`/room/${roomId}`);
    } catch (err) {
      window.alert(err);
    }
    setLoading(false);
  };

  return (
    <LoginWrapper>
      <h1>Enter Room</h1>
      <form onSubmit={handleSubmit}>
        <Input type="password" value={password} onChange={setPassword}>
          Password
        </Input>
        <Button type="submit">Enter</Button>
      </form>
    </LoginWrapper>
  );
}
