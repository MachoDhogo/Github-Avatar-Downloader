var request = require('request');
var secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');


//This declarative function authenticates user on Github and JSON parses the data given
//cb is the callback function that is passed back to the invoking function
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var parse = JSON.parse(body);
    cb(err, parse);
  });
}

//this function loops through the Github avatars and outputs each URL and filepath to the function downloadImagebyURL
getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  if(!process.argv[2] && !process.argv[3]) {
    return console.log("Input error: missing repoOwner and repoName");
  }
  else if(!process.argv[3]) {
    return console.log("Input error: missing repoName");
  }

  console.log("Errors:", err);
  result.forEach(function(element) {
    var avatarURL = element.avatar_url;
    var createdFilePath = "./avatars" + element.login + ".jpg";
    downloadImageByURL(avatarURL, createdFilePath);
  })
});

var request = require('request');
var fs = require('fs');

//this function receives the URL and filepath from above which is the incoming readable data stream, transforms to write stream, then creates a new filepath into local directory and streams data into it
function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
}





