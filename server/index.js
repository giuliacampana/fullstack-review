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

  // check if req.body is just the username!!
  console.log('POST REQUEST DATA------------', req.body);
  res.send(req.body);

  github.getReposByUsername(req.body.username, function(err, data) {
  	if (err) {
  	  console.log(err);
  	} else {
  	  // pass data to database
  	  db.saveRepo(data, function(err, results) {
  	  	if (err) {
  	  	  res.status(500).send();
  	  	} else {
  	  	  res.status(201).send('SERVER repos stored!');
  	  	}
  	  });
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

