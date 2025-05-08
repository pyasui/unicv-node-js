const axios = require('axios');

const api = axios.create({
    baseURL: process.env.ASAAS_BASE_URL,
    headers: {
      "Content-Type": 'application/json',
      'access-token': process.env.ASAAS_ACCESS_TOKEN
    }
  });
  
  module.exports = api;
