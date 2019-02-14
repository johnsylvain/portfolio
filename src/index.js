import { render, h } from './lib/vdom';
import { createStore } from './lib/store';
import reducer from './reducer';
import App from './components/app';

const store = createStore(reducer);

store.subscribe(() => {
  render(<App store={store} />, document.querySelector('#app-selector'));
});

store.dispatch({ type: '@@INIT' });
