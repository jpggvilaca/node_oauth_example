const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('qs');
const { config } = require('./src/config');

// Util functions
const generateLoginSchema = (username, password) => ({
  url: config.apiUrl.login,
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': config.headerAuth
  },
  data: qs.stringify({
    'grant_type': 'password',
    'username': username,
    'password': password
  })
});

const generateUserInfoSchema = (tokenType, accessToken) => ({
  url: config.apiUrl.customer,
  method: 'get',
  headers: {
    'Authorization': `${tokenType} ${accessToken}`
  }
});

// To parse the body of the request coming from axios's frontend requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// To handle CORS 'issues' when testing locally
app.use(cors());

// Login user
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const loginRequestSchema = generateLoginSchema(username, password);

  // Get the access token
  axios(loginRequestSchema)
    .then(response => {
      const { token_type, access_token } = response.data;
      const getUserInfoSchema = generateUserInfoSchema(token_type, access_token);

      // Get the customer info
      axios(getUserInfoSchema)
        .then(response => {
          const { firstName, lastName } = response.data;

          res.send({ firstName, lastName });
        })
        .catch(err => {
          const { error, error_description } = err.response.data;

          res.send({ error, error_description })
        })
    })
    .catch(err => {
      const { error, error_description } = err.response.data;

      res.send({ error, error_description })
    });
});

// Boot up the server
app.listen(3000, () => console.log('App listening on port 3000...'));
