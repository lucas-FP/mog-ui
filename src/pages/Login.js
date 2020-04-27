import React, { useState } from 'react';
import styled from 'styled-components';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';
import { Button, Input, Title, Expandable } from '../components';
import { navigate } from '@reach/router';

const LoginWrapper = styled.div`
  display: flex;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 500px;
  margin: 20vh auto;
  height: 50vh;
  align-items: center;
`;

const SpacedInput = styled(Input)`
  margin: 10px;
`;

const SectionForm = styled.form`
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

//TODO think of better layout for all the options (and uncomment them!!)

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [nick, setNick] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerNick, setRegisterNick] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    const res = await LoginService.login(userName, password);
    setLoading(false);
    if (res.status === 204) navigate('/list');
  };

  const handleGuestSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    const res = await LoginService.guestLogin(nick);
    setLoading(false);
    if (res.status === 204) navigate('/list');
  };

  const handleRegisterSubmit = async (evt) => {
    evt.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      window.alert('Password does not match confirmation.');
      return;
    }
    setLoading(true);
    const res = await UserService.register(
      registerName,
      registerNick,
      registerPassword
    );
    setLoading(false);
    if (res.status === 200) navigate('/list');
  };

  return (
    <LoginWrapper>
      {/* <SectionWrapper>
        <Title>Login</Title>
        <SectionForm onSubmit={handleSubmit}>
          <SpacedInput value={userName} onChange={setUserName}>
            User Name
          </SpacedInput>
          <SpacedInput type="password" value={password} onChange={setPassword}>
            Password
          </SpacedInput>
          <EnterButton type="submit">Enter</EnterButton>
        </SectionForm>
      </SectionWrapper> */}
      <SectionWrapper>
        <Title>Enter as Guest</Title>
        <SectionForm onSubmit={handleGuestSubmit}>
          <SpacedInput value={nick} onChange={setNick}>
            Nickname
          </SpacedInput>
          <EnterButton type="submit">Enter</EnterButton>
        </SectionForm>
      </SectionWrapper>
      {/* <SectionWrapper>
        <Title>Register</Title>
        <SectionForm onSubmit={handleRegisterSubmit}>
          <SpacedInput value={registerName} onChange={setRegisterName}>
            User Name
          </SpacedInput>
          <SpacedInput value={registerNick} onChange={setRegisterNick}>
            Nickname
          </SpacedInput>
          <SpacedInput
            type="password"
            value={registerPassword}
            onChange={setRegisterPassword}
          >
            Password
          </SpacedInput>{' '}
          <SpacedInput
            type="password"
            value={registerConfirmPassword}
            onChange={setRegisterConfirmPassword}
          >
            Confirm Password
          </SpacedInput>
          <EnterButton type="submit">Register</EnterButton>
        </SectionForm>
      </SectionWrapper> */}
    </LoginWrapper>
  );
}
