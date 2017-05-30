class Router {
  constructor(routes) {
    this.routes = {}

    routes.forEach(route => {
      this.addRoute(route.path, route.controller);
    })

    window.addEventListener('hashchange', this.go.bind(this));
    window.addEventListener('load', this.go.bind(this));
  }

  go(path) {
    if (path.route) history.replaceState(undefined, undefined, path.route)

    const url = location.hash.slice(1) || '/';
    const route = this.routes[url];

    if (route.controller) route.controller();
    else {
      this.routes['/'].controller();
      history.replaceState(undefined, undefined, '#/')
    }
  }

  addRoute(path, controller) {
    this.routes[path] = { controller }
  }
}

export default Router;
