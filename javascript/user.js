import '../style/index.scss';

import User from './components/UserInfo';
import StarsButtons from './components/StarsButtons';

const app = {
  init () {
    new StarsButtons();
    User.get();
  }
}

app.init();