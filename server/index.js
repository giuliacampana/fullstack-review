const express = require('express');
const db = require('../database/index.js');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // req.body is the username we're looking for
  // first, query the database for the username to see if we already have repos
  db.findReposByUsername(req.body, (err, results) => {
  	if (err) {
      // send GET request to API
      request('API', (error, response, body) => {

      })
  	} else {
      // do nothing
      res.status(201).end('username already in database -- nothing to post');
  	}
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  // employs database findRepo function to query the database and find 25 repos with most stargazers
  // findRepo passes data as an array of repo object into the callback
  // callback sends data back to client

  db.findReposByStargazers((err, results) => {
  	if (err) {
  	  console.log(err);
  	} else {
  	  res.json(200, results);
  	}
  })
});
 
let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

