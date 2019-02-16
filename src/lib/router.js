import { throttle } from './utils';

class Router {
  constructor() {
    this.routes = {};
    this.callbacks = [];

    window.addEventListener('popstate', this.go.bind(this, undefined));
    window.addEventListener('load', this.go.bind(this, undefined));
    window.addEventListener('click', event => {
      if (event.target.attributes['data-to']) {
        this.go(event.target.attributes['data-to'].value);
      }
    });
    window.addEventListener(
      'resize',
      throttle(() => {
        if (window.innerWidth <= 768) {
          this.go('/');
        }
      }, 250)
    );
  }

  on(path, handler) {
    this.routes[path] = handler;
  }

  subscribe(cb) {
    this.callbacks.push(cb);
  }

  go(path) {
    if (path !== window.location.pathname) {
      if (path) {
        history.pushState(undefined, undefined, path);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }

      const url = !!this.routes[window.location.pathname]
        ? window.location.pathname || '/'
        : '/';

      this.routes[url]();

      if (!this.routes[window.location.pathname]) {
        history.pushState(undefined, undefined, '/');
      }

      this.callbacks.forEach(cb => cb.call(undefined, url));
    }
  }
}

export const router = new Router();
