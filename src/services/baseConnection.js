import axios from 'axios';

const connection = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://mog-backend.herokuapp.com'
      : 'http://localhost:3333',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default connection;
