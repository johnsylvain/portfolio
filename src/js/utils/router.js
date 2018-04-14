export default function Router (routes) {
  this.routes = routes

  window.addEventListener('hashchange', this.go.bind(this, undefined))
  window.addEventListener('load', this.go.bind(this, undefined))
}

Router.prototype.go = function go (path) {
  if (path)
    history.replaceState(undefined, undefined, path)

  const url = location.hash.slice(1) || '/'

  if (this.routes[url]) {
    this.routes[url]()
  } else {
    this.routes['/']()
    history.replaceState(undefined, undefined, '/')
  }
}
