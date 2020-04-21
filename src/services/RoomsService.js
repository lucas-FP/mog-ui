import connection from './baseConnection';

export default {
  listPublicRooms(page) {
    return connection.get('/room', {
      params: {
        page,
      },
    });
  },
  listUserRooms() {
    return connection.get('/user/rooms');
  },
  createRoom(name, maxPlayers, isPublic, password) {
    return connection.post('/room', { name, maxPlayers, isPublic, password });
  },
  enterRoom(roomId, password) {
    return connection.post('/user/rooms/' + roomId, { password });
  },
};
