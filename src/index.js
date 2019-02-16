import { render, h, router, createStore } from './lib';
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

router.subscribe(path => {
  const navButtons = Array.from(document.querySelector('.nav').children);
  navButtons.forEach(a => a.classList.remove('active'));
  navButtons
    .find(a => a.attributes['data-to'].value === path)
    .classList.add('active');
});

store.subscribe(() => {
  render(<App store={store} />, document.querySelector('#app-selector'));
});

store.dispatch({ type: '@@INIT' });
