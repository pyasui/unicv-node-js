const axios = require('axios');

const api = axios.create({
    baseURL: process.env.FOOTBALL_DATA_URL,
    headers: {
      "Content-Type": 'application/json',
      'X-Auth-Token': process.env.FOOTBALL_DATA_TOKEN
    }
  });
  
  module.exports = api;
