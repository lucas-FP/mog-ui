import connection from './baseConnection';

export default {
  getDefaultConfig(gameCode) {
    return connection.get(`/games-defaults/${gameCode}`);
  },
};
