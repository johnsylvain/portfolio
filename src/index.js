import { router } from './lib/router';
import { render, h } from './lib/vdom';
import { createStore } from './lib/store';
import { reducer } from './reducer';
import { App } from './components/app';
import { SET_INTERACTIVE_MODE } from './constants/actions';

const store = createStore(reducer);

router.on('/', () => {
  store.dispatch({
    type: SET_INTERACTIVE_MODE,
    payload: false
  });

  document.querySelector('.wrap').classList.remove('interactive-mode');
});

router.on('/resume', () => {
  store.dispatch({
    type: SET_INTERACTIVE_MODE,
    payload: true
  });

  document.querySelector('.wrap').classList.add('interactive-mode');

  if (window.innerWidth <= 768) {
    router.go('/');
  }
});

store.subscribe(() => {
  render(
    <App store={store} router={router} />,
    document.querySelector('#app-selector')
  );
});

store.dispatch({ type: '@@INIT' });
