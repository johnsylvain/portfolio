export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.callbacks = [];

    window.addEventListener('popstate', this.go.bind(this, undefined));
    window.addEventListener('load', this.go.bind(this, undefined));
  }

  subscribe(cb) {
    this.callbacks.push(cb);
  }

  get isRoute() {
    return !!this.routes[window.location.pathname];
  }

  go(path) {
    if (path !== window.location.pathname) {
      if (path) {
        history.pushState(undefined, undefined, path);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }

      const url = this.isRoute ? window.location.pathname || '/' : '/';

      this.routes[url]();

      if (!this.isRoute) {
        history.pushState(undefined, undefined, '/');
      }

      this.callbacks.forEach(cb => cb.call(undefined, url));
    }
  }
}
