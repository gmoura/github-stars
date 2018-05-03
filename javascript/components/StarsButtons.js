const git = require('../services');
const doc = document;
const selector = '.user-repos-with-stars__button';

class StarsButtons {
  constructor () {
    this.bindButtons()
  }

  selectecButtons () {
    return doc.querySelectorAll(selector);
  }

  unstar (owner, repo, element) {
    git.unstar({owner,repo})
      .then((result) => {
        element.classList.remove('button--unstar');
        element.classList.add('button--star')
        element.textContent = 'star';
      })
  }

  star (owner, repo, element) {
    git.star({owner,repo})
      .then((result) => {
        element.classList.remove('button--star');
        element.classList.add('button--unstar')
        element.textContent = 'unstar';
      })
  }

  bindButtons () {
    const buttons = this.selectecButtons();
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

export default StarsButtons;
