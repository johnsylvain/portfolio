class Router {
  routes = {};
  navButtons = Array.from(document.querySelectorAll('[data-to]'));
  activeClass = this.navButtons[0].getAttribute('data-to-active-class');

  constructor() {
    window.addEventListener('popstate', this.go.bind(this, undefined));
    window.addEventListener('load', this.go.bind(this, undefined));
    window.addEventListener('click', event => {
      const {
        target: { attributes }
      } = event;

      if (attributes['data-to']) {
        this.go(attributes['data-to'].value);
      }
    });
  }

  on(path, handler) {
    this.routes[path] = handler;
  }

  go(path) {
    if (path === window.location.pathname) return;

    if (path) {
      history.pushState(undefined, undefined, path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }

    (this.routes[window.location.pathname] || this.routes['/'])();

    if (!this.routes[window.location.pathname]) {
      history.pushState(undefined, undefined, '/');
    }

    this.navButtons.forEach(a => a.classList.remove(this.activeClass));
    this.navButtons
      .find(a => a.attributes['data-to'].value === window.location.pathname)
      .classList.add(this.activeClass);
  }
}

export const router = new Router();
