var events = require('./events');

var router = {
  routes: {},

  init: function() {
    this.addRoute('/', function() {
      // app.switchModes(true);
      events.emit('switchModes', {flag: true});
    });
    this.addRoute('/resume', function() {
      // app.switchModes(false);
      events.emit('switchModes', {flag: false});
    });

    window.addEventListener('hashchange', this.exec.bind(this));
    window.addEventListener('load', this.exec.bind(this));
  },

  exec: function(path) {
    if (path.route) history.replaceState(undefined, undefined, path.route)

    var url = location.hash.slice(1) || '/';
    var route = this.routes[url];

    if (route.controller) route.controller();
    else {
      this.routes['/'].controller();
      history.replaceState(undefined, undefined, '#/')
    }
  },

  addRoute: function(path, controller) {
    this.routes[path] = {controller: controller}
  }
}

module.exports = router;
