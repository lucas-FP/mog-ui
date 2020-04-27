import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Title } from '../components';
import RoomsService from '../services/RoomsService';
import { navigate } from '@reach/router';

//TODO check if possible to componentize (its the same layout in login page)

const LoginWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 500px;
  margin: 20vh auto;
  height: 50vh;
  align-items: center;
`;

const Form = styled.form`
  padding: 5px;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify
`;

const EnterButton = styled(Button)`
  margin: 20px auto;
`;

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
      <Title>Enter Room</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="password" value={password} onChange={setPassword}>
          Password
        </Input>
        <EnterButton type="submit">Enter</EnterButton>
      </Form>
    </LoginWrapper>
  );
}
