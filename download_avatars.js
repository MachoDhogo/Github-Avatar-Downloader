var request = require('request');
var secrets = require('./secrets');

// Your next and final step in this exercise should be to change your getRepoContributors function to
//parse the JSON string into an object and pass this object (an array of contributor objects) to the cb function.

// You will also need to modify the callback function to iterate over the results and (for now)
// console.log the value for each avatar_url in the collection:

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var parse = JSON.parse(body); // JSON parses the body of the results
    cb(err, parse);
  });
}

// HOW TO CHECK IT AUTHENTICATED?
// DID I DO AUTHENTICATION CORRECT?

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
  result.forEach(function(element){
    console.log(element.avatar_url)
})
});



