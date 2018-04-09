class Router {
  constructor (routes) {
    this.routes = routes

    window.addEventListener('hashchange', this.go.bind(this))
    window.addEventListener('load', this.go.bind(this))
  }

  go (path) {
    if (path.route)
      history.replaceState(undefined, undefined, path.route)

    const url = location.hash.slice(1) || '/'

    if (this.routes[url]) {
      this.routes[url]()
    } else {
      this.routes['/']()
      history.replaceState(undefined, undefined, '#/')
    }
  }
}

export default Router
