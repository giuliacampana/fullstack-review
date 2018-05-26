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

  	// for (var i = 0; i < arrayfromGithub.length; i++) {
  	//   const repo = new Repo({
  	// 					  name: arrayfromGithub[i].name,
  	// 					  user: arrayfromGithub[i].owner.login,
  	// 					  html_url: arrayfromGithub[i].html_url,
  	// 					  stargazers: arrayfromGithub[i].stargazers_count
  	// 					  });

  	//   repo.save((err, results) => {
   //      console.log('DATABASE SAVE REPO callback is run');

  	//     if (err) {
  	//       console.log('DATA WAS NOT SAVED IN THE DATABASE');
  	//   	  callback(err, null);
  	//     } else {
  	//       console.log('DATA WAS SAVED IN THE DATABASE');
  	//   	  callback(null, results);
  	//     }
  	//   });
   // }  
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




