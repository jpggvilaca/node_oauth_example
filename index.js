const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', express.static( __dirname + '/' ) );

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  console.log('Username: ', username);
  console.log('Password: ', password);

  res.send('success');
});

app.post('/login', (req, res) => {
  res.send('login');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
