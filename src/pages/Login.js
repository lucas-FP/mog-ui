import React, { useState } from 'react';
import styled from 'styled-components';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';
import { Button, Input } from '../components';
import { navigate } from '@reach/router';

const LoginWrapper = styled.div`
  display: flex;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const SectionForm = styled.form`
  padding: 5px;
`;

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
      <SectionWrapper>
        <h1>Login</h1>
        <SectionForm onSubmit={handleSubmit}>
          <Input value={userName} onChange={setUserName}>
            User Name
          </Input>
          <Input type="password" value={password} onChange={setPassword}>
            Password
          </Input>
          <Button type="submit">Enter</Button>
        </SectionForm>
      </SectionWrapper>
      <SectionWrapper>
        <h1>Enter as Guest</h1>
        <SectionForm onSubmit={handleGuestSubmit}>
          <Input value={nick} onChange={setNick}>
            Nickname
          </Input>
          <Button type="submit">Enter</Button>
        </SectionForm>
      </SectionWrapper>
      <SectionWrapper>
        <h1>Register</h1>
        <SectionForm onSubmit={handleRegisterSubmit}>
          <Input value={registerName} onChange={setRegisterName}>
            User Name
          </Input>
          <Input value={registerNick} onChange={setRegisterNick}>
            Nickname
          </Input>
          <Input
            type="password"
            value={registerPassword}
            onChange={setRegisterPassword}
          >
            Password
          </Input>{' '}
          <Input
            type="password"
            value={registerConfirmPassword}
            onChange={setRegisterConfirmPassword}
          >
            Confirm Password
          </Input>
          <Button type="submit">Register</Button>
        </SectionForm>
      </SectionWrapper>
    </LoginWrapper>
  );
}
