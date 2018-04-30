const superagent = require('superagent');

const GithubServices = {
  getUserInfo () {
    return superagent.get('/user-info');
  }
}

module.exports = GithubServices;