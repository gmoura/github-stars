const superagent = require('superagent');

const GithubServices = {
  getUserInfo () {
    return superagent.get('/user-info');
  },

  unstar (options) {
    return  superagent.post('/unstar').send(options);
  },

  star (options) {
    return superagent.post('/star').send(options);
  }
  
}

module.exports = GithubServices;