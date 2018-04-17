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


var request = require('request');
var fs = require('fs');

function downloadImageByURL(url, filePath) {
  request.get(url + filePath) //request.get equivalent to request()
    .on('error', function(err) {
      throw err;  //request.on('error', callback handles any error)
    })

    .on('response', function (response) {
      console.log(response.statusCode + " " + response.statusMessage + " " + response.headers['content-type']);
    })

    .on('end', function(){
      console.log('Downloading complete.');
    })

.pipe(fs.createWriteStream('./avatar.jpg')); //handles incoming readable data stream, transforms to write stream, then creates a future.jpg into local directory and streams data into it
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");



