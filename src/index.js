import { render } from './lib/vdom';
import store from './store/index.js';
import App from './components/app';

const appInstance = new App({ store });

store.subscribe(() => {
  render(appInstance.render(), document.querySelector('#app-selector'));
});
