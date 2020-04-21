import axios from 'axios';

const connection = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://desolate-mesa-14660.herokuapp.com'
      : 'http://localhost:3333',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default connection;
