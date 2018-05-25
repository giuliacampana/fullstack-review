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

let saveRepo = (arrayfromGithub) => {
  const parsedArray = JSON.parse(arrayfromGithub);

  for (var i = 0; i < parsedArray.length; i++) {
  	const repo = new Repo({
  						  id: parsedArray[i].id,
  						  name: parsedArray[i].name,
  						  user: parsedArray[i].owner.login,
  						  html_url: parsedArray[i].html_url,
  						  description: parsedArray[i].description,
  						  stargazers: parsedArray[i].stargazers_count
  						});
  	repo.save((err) => {
  	  if (err) {
  	  	console.log(err);
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




