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

  go(path) {
    if (path) {
      history.pushState(undefined, undefined, path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }

    const url = window.location.pathname || '/';

    if (this.routes[url]) {
      this.routes[url]();
    } else {
      this.routes['/']();
      history.pushState(undefined, undefined, '/');
    }

    this.callbacks.forEach(cb => cb.call(undefined, url));
  }
}
