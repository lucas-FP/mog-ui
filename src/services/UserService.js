import connection from './baseConnection';

export default {
  register(userName, nick, password) {
    return connection.post('/user', {
      userName,
      nick,
      password,
      isGuest: false,
    });
  },
};
