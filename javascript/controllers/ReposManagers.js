const superagent = require('superagent');
const doc = document;
const selector = '.user-repos-with-stars__button';

class Repos {
  constructor () {
    this.bindButtons()
  }

  selectecButtons () {
    return doc.querySelectorAll(selector);
  }

  unstar (owner, repo, element) {
    superagent
      .post('/unstar')
      .send({owner,repo})
      .then((result) => {
        element.classList.remove('button--unstar');
        element.classList.add('button--star')
        element.textContent = 'star';
      })
  }

  star (owner, repo, element) {
    superagent
    .post('/star')
    .send({owner,repo})
    .then((result) => {
      element.classList.remove('button--star');
      element.classList.add('button--unstar')
      element.textContent = 'unstar';
    })
  }

  bindButtons () {
    let buttons = this.selectecButtons();
    buttons.forEach((element, index, number) => {
      element.addEventListener('click', (event) => {
        const element = event.target;
        const owner = element.dataset.owner;
        const repo = element.dataset.repo;
        if(element.classList.contains('button--unstar')){
          this.unstar(owner, repo, element)
        } else {
          this.star(owner, repo, element)
        }
      })
    })
  }
}

export default Repos;