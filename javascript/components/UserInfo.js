const superagent = require('superagent');
const doc = document;

const UserInfor = {
  get() {
    superagent
      .get('/user-info')
      .then( (result) => {
        this.render(result.body);
      })

  },
  render (data) {
    doc.querySelector('.user-hero__photo').setAttribute('src', data.avatar_url);
    doc.querySelector('.search__profile-image').setAttribute('src', data.avatar_url);
    doc.querySelector('.user-hero__name').textContent = data.name;
    doc.querySelector('.user-hero__nike').textContent = data.login;
    doc.querySelector('[name="company"]').textContent = data.location;
    doc.querySelector('[name="bio"]').textContent = data.bio;
    doc.querySelector('[name="email"]').textContent = data.email;
    doc.querySelector('[name="location"]').textContent = data.location;
    doc.querySelector('[name="blog"]').textContent = data.blog;

  }
}

export default UserInfor;