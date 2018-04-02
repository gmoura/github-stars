import '../style/index.scss';

import User from './components/UserInfo';
import ReposManagers from './controllers/ReposManagers';

const app = {
  init () {
    const repos = new ReposManagers();
    User.get();
  }
}

app.init();