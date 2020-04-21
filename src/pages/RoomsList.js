import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { navigate, Link } from '@reach/router';
import { Button, List, Input } from '../components';

import RoomsService from '../services/RoomsService';

const PageWrapper = styled.div`
  display: flex;
`;
const ListsWrapper = styled.div`
  flex: 1;
`;
const CreateWrapper = styled.div`
  flex: 1;
`;

const CreateButton = styled(Button)``;

export default function RoomsList() {
  //TODO make good pagination functionality
  const [publicRooms, setPublicRooms] = useState([]);
  const [publicRoomsPage, setPublicRoomsPage] = useState(1);
  const [userRooms, setUserRooms] = useState([]);

  const [roomName, setRoomName] = useState('');
  const [roomMaxPlayers, setRoomMaxPlayers] = useState(0);
  const [roomIsPublic, setRoomIsPublic] = useState(false);
  const [roomPassword, setRoomPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    await RoomsService.createRoom(
      roomName,
      roomMaxPlayers,
      roomIsPublic,
      roomPassword
    );
    refreshLists();
  };

  const refreshLists = () => {
    setLoading(true);
    Promise.all([
      RoomsService.listPublicRooms(publicRoomsPage),
      RoomsService.listUserRooms(),
    ])
      .then(([publicRooms, userRooms]) => {
        setPublicRooms(publicRooms.data);
        setUserRooms(userRooms.data);
      })
      .catch((err) => {
        if (err.response.status === 401) navigate(`/login`);
        else window.alert(err.response);
      })
      .finally(() => setLoading(false));
  };

  useEffect(refreshLists, [publicRoomsPage]);

  const getRoomLink = (r) => (
    <Link id={r.id} key={r.id} to={`/room/${r.id}`}>
      {r.name}
    </Link>
  );

  return (
    <PageWrapper>
      <ListsWrapper>
        <h1>Rooms</h1>
        <List title="Public Rooms">{publicRooms.map(getRoomLink)}</List>{' '}
        <List title="Your Rooms">{userRooms.map(getRoomLink)}</List>
      </ListsWrapper>
      <CreateWrapper>
        <h3>Create Room</h3>
        <form onSubmit={handleSubmit}>
          <Input value={roomName} onChange={setRoomName}>
            Room name
          </Input>
          <Input
            type="number"
            min={0}
            value={roomMaxPlayers}
            onChange={setRoomMaxPlayers}
          >
            Maximum Users
          </Input>
          <Input
            type="checkbox"
            value={roomIsPublic}
            onChange={(evt) => {
              setRoomIsPublic(evt);
            }}
          >
            Is Public?
          </Input>
          <Input
            type="password"
            value={roomPassword}
            onChange={setRoomPassword}
          >
            Password
          </Input>
          <CreateButton type="submit">Create new Room</CreateButton>
        </form>
      </CreateWrapper>
    </PageWrapper>
  );
}
