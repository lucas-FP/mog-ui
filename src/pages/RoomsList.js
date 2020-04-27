import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import { Button, List, LinkButton, Input, Title, Card } from '../components';

import RoomsService from '../services/RoomsService';

const PageWrapper = styled.div`
  margin-top: 10vh;
`;
const ListsWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const RoomList = styled(List)`
  max-width: 300px;
  flex: 1;
`;

const CreateCard = styled(Card)`
  max-width: 300px;
  flex: 1;
`;

const FullSpaceLink = styled(LinkButton)`
  width: 100%;
  height: 100%;
`;

const CreateButton = styled(Button)`
  margin: 20px auto;
`;

export default function RoomsList() {
  //TODO make good pagination functionality
  const [publicRooms, setPublicRooms] = useState([]);
  const [publicRoomsPage, setPublicRoomsPage] = useState(1);
  const [userRooms, setUserRooms] = useState([]);

  const [roomName, setRoomName] = useState('');
  const [roomMaxPlayers, setRoomMaxPlayers] = useState(2);
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
    <FullSpaceLink id={r.id} key={r.id} to={`/room/${r.id}`}>
      {r.name}
    </FullSpaceLink>
  );

  return (
    <PageWrapper>
      <Title>Rooms</Title>
      <ListsWrapper>
        <RoomList type="card" title="Public Rooms">
          {publicRooms.map(getRoomLink)}
        </RoomList>{' '}
        <RoomList type="card" title="Your Rooms">
          {userRooms.map(getRoomLink)}
        </RoomList>
        <CreateCard title="Create Room">
          <form onSubmit={handleSubmit}>
            <Input value={roomName} onChange={setRoomName}>
              Room name
            </Input>
            <Input
              type="number"
              min={2}
              max={12}
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
        </CreateCard>
      </ListsWrapper>
    </PageWrapper>
  );
}
