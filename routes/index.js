const express = require('express');
const superagent = require('superagent');
const octokit = require('@octokit/rest')({debug: true})
const octoConfig = require('../config/github.config');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', octoConfig)
});

router.get('/authorized', (req, res, next) => {
  if(req.query.code) {
    superagent
      .post('https://github.com/login/oauth/access_token')
      .send({ 
        client_id: octoConfig.client_id, 
        client_secret: octoConfig.client_secret,
        code: req.query.code,
        redirect_uri : "http://localhost:3000/"
      }) 
      .set('Accept', 'application/json')
      .end( (err, result) => {
          if(!err && result.body.access_token) {
            res.cookie('access_token', result.body.access_token)
            res.redirect('/repos');
          } else {
            res.render('not-found', octoConfig)
          }
      } )
  }
})

router.get('/repos', (req, res, next) => {
  try {
    octokit.authenticate({
      type: 'oauth',
      token: req.cookies.access_token
    })
  
    octokit.activity.getStarredRepos({})
    .then(result => {
      res.render('starred', result);
    }).catch(err => {
      console.log(err)
      res.render('not-found');
    })
  } catch(err) {
    console.log(err)
    res.render('not-found', octoConfig);
  }
})

router.get('/user-info', (req, res, next) => {
  octokit.authenticate({
    type: 'oauth',
    token: req.cookies.access_token
  })

  octokit.users.get({})
  .then(result => {
    res.json(result.data);
  }).catch(err => {
    console.log(err)
    res.render('index');
  })
})

router.post('/unstar', (req, res, next) => {
  
  octokit.authenticate({
    type: 'oauth',
    token: req.cookies.access_token
  })
  octokit.activity.unstarRepo({'owner':req.body.owner, 'repo': req.body.repo})
  .then(result => {
    res.json(result.data);
  }).catch(err => {
    console.log(err)
    res.render('index');
  })
})


router.post('/star', (req, res, next) => {
  const owner = req.body.owner;
  const repo = req.body.repo;
  octokit.authenticate({
    type: 'oauth',
    token: req.cookies.access_token
  })

  octokit.activity.starRepo({owner, repo})
  .then(result => {
    res.json(result.data);
  }).catch(err => {
    console.log(err)
    res.render('index');
  })
})

module.exports = router;