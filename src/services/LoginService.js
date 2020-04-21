import connection from './baseConnection';

export default {
  login(userName, password) {
    return connection.post('/login', { userName, password });
  },
  guestLogin(nick) {
    return connection.post('/guestlogin', { nick });
  },
};
