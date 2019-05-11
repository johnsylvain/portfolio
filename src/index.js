import { render, h, router, createStore, mediaQuery } from './lib';
import { CLI } from './components/cli';
import { SET_INTERACTIVE_MODE } from './constants/actions';
import { reducer } from './reducer';

const store = createStore(reducer);
const pageWrap = document.querySelector('.wrap');
const BREAKPOINT = 768;

mediaQuery(`(max-width: ${BREAKPOINT}px)`, () => router.go('/'));

router.on('/', () => {
  store.dispatch({
    type: SET_INTERACTIVE_MODE,
    payload: false
  });

  pageWrap.classList.remove('interactive-mode');
});

router.on('/resume', () => {
  if (window.innerWidth >= BREAKPOINT) {
    store.dispatch({
      type: SET_INTERACTIVE_MODE,
      payload: true
    });

    pageWrap.classList.add('interactive-mode');
  } else {
    router.go('/');
  }
});

store.subscribe(() => {
  render(<CLI store={store} />, document.querySelector('#root'));
});

store.dispatch({ type: '@@INIT' });
