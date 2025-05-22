const axios = require('axios');

const api = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      "Content-Type": 'application/json',
      'X-Auth-Token': process.env.API_ACCESS_TOKEN
    }
  });
  
  module.exports = api;
