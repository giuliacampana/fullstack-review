const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  name: {type: String, unique: false, dropDups: true},
  user: String,
  html_url: String,
  stargazers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let saveRepo = (arrayfromGithub, callback) => {
	console.log('arrayfromGithub: ', arrayfromGithub);
	console.log('callback: ', callback);

	arrayfromGithub = JSON.parse(arrayfromGithub);

	var reposToSave = arrayfromGithub.map((repo) => {
	  return {
	  	name: repo.name,
	  	user: repo.owner.login,
	  	html_url: repo.html_url,
	  	stargazers: repo.stargazers_count
	  }
	});

	Repo.insertMany(reposToSave, callback);
}

let findReposByStargazers = (callback) => {
  Repo.find()
  .sort({ stargazers: 'desc' })
  .limit(25)
  .exec(function(err, results) {
  	if (err) {
  	  callback(err, null);
  	} else {
  	  callback(null, results);
    };
  });
}


module.exports.saveRepo = saveRepo;
module.exports.findReposByStargazers = findReposByStargazers;




