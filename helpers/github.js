const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  
  let options = {
    method: 'GET',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  request(options, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;