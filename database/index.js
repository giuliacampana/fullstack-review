const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  user: String,
  html_url: String,
  description: String,
  stargazers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let saveRepo = (arrayfromGithub, callback) => {
  	for (var i = 0; i < arrayfromGithub.length; i++) {
  	const repo = new Repo({
  						  id: { 
  						  	    type: String,
  						  	    index: true,
  						  	    unique: true
  						  	  },
  						  name: arrayfromGithub[i].name,
  						  user: arrayfromGithub[i].owner.login,
  						  html_url: arrayfromGithub[i].html_url,
  						  description: arrayfromGithub[i].description,
  						  stargazers: arrayfromGithub[i].stargazers_count
  						});

  	repo.save((err, results) => {
  	  if (err) {
  	  	callback(err, null);
  	  } else {
  	  	callback(null, results);
  	  }
  	});
  }  
}

let findReposByStargazers = (callback) => {
  Repo.find((err) => {
  	if (err) { 
  	  console.log(err); 
  	}
  }).limit(25).sort({ stargazers: -1 }).exec(callback);
}

let findReposByUsername = (username, callback) => {
  Repo.find({ user: username }, (err, results) => {
  	if (err) { 
  	  callback(err, null); 
  	} else {
  	  callback(null, results); 
  	}
  });
}

module.exports.saveRepo = saveRepo;
module.exports.findReposByStargazers = findReposByStargazers;
module.exports.findReposByUsername = findReposByUsername;




