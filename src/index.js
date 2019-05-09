import { render, h, router, store } from './lib';
import { CLI } from './components/cli';
import { SET_INTERACTIVE_MODE } from './constants/actions';

const pageWrap = document.querySelector('.wrap');

const routes = [
  [
    '/',
    () => {
      store.dispatch({
        type: SET_INTERACTIVE_MODE,
        payload: false
      });

      pageWrap.classList.remove('interactive-mode');
    }
  ],
  [
    '/resume',
    () => {
      if (window.innerWidth >= 768) {
        store.dispatch({
          type: SET_INTERACTIVE_MODE,
          payload: true
        });

        pageWrap.classList.add('interactive-mode');
      } else {
        router.go('/');
      }
    }
  ]
];

routes.forEach(([route, handler]) => {
  router.on(route, handler);
});

store.subscribe(() => {
  render(<CLI store={store} />, document.querySelector('#root'));
});

store.dispatch({ type: '@@INIT' });

const media = window.matchMedia('(max-width: 768px)');

media.addListener(() => {
  if (media.matches) {
    router.go('/');
  }
});
