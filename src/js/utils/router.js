class Router {
  constructor (routes) {
    this.routes = routes

    window.addEventListener('hashchange', this.go.bind(this))
    window.addEventListener('load', this.go.bind(this))
  }

  go (event) {
    const path = typeof event === 'string'
      ? event : null
  
    if (path)
      history.replaceState(undefined, undefined, path)

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
