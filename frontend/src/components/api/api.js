import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:2001',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
});

export default instance;