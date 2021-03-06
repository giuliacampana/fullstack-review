const express = require('express');
const db = require('../database/index.js');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {

  github.getReposByUsername(req.body.username, function(err, data) {
  	if (err) {
  	  res.end(err);

  	} else {
  	  console.log('API CALL SUCCESSFUL: data found from Github API');

  	  db.saveRepo(data.body, function(err, results) {

  	  	if (err) {
  	  	  res.end(err);

  	  	} else {
  	  	  res.send('SERVER repos stored and response sent to client!');
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

  db.findReposByStargazers(function(err, results) {
  	if (err) {
  	  console.log(err);
  	} else {
  	  res.send(results);
  	}
  })
});
 
let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

