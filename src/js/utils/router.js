export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.callbacks = [];

    window.addEventListener('hashchange', this.go.bind(this, undefined));
    window.addEventListener('load', this.go.bind(this, undefined));
  }

  onRouteChange(cb) {
    this.callbacks.push(cb);
  }

  go(path) {
    if (path) history.replaceState(undefined, undefined, path);

    const url = location.hash.slice(1) || '/';

    if (this.routes[url]) {
      this.routes[url]();
    } else {
      this.routes['/']();
      history.replaceState(undefined, undefined, '/');
    }

    this.callbacks.forEach(cb => cb.call(undefined, url));
  }
}
