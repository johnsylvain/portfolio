// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({11:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
  function Router(routes) {
    var _this = this;

    _classCallCheck(this, Router);

    this.routes = {};

    routes.forEach(function (route) {
      _this.addRoute(route.path, route.controller);
    });

    window.addEventListener('hashchange', this.go.bind(this));
    window.addEventListener('load', this.go.bind(this));
  }

  _createClass(Router, [{
    key: "go",
    value: function go(path) {
      if (path.route) history.replaceState(undefined, undefined, path.route);

      var url = location.hash.slice(1) || '/';
      var route = this.routes[url];

      if (route && route.controller) route.controller();else {
        this.routes['/'].controller();
        history.replaceState(undefined, undefined, '#/');
      }
    }
  }, {
    key: "addRoute",
    value: function addRoute(path, controller) {
      this.routes[path] = { controller: controller };
    }
  }]);

  return Router;
}();

exports.default = Router;
},{}],12:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var events = {
  events: {},

  on: function on(name, fn) {
    (this.events[name] || (this.events[name] = [])).push(fn);
  },
  off: function off(name, fn) {
    this.events[name].splice(this.events[name].indexOf(fn) >>> 0, 1);
  },
  emit: function emit(name, data, context) {
    (this.events[name] || []).map(function (fn) {
      fn.call(context, data);
    });
  }
};

exports.default = events;
},{}],13:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = throttle;
function throttle(func, threshhold, scope) {
  var wait = false;

  return function () {
    if (!wait) {
      func.apply(scope, arguments);
      wait = true;
      setTimeout(function () {
        wait = false;
      }, threshhold);
    }
  };
}

var compose = exports.compose = function compose() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (initialValue) {
    return fns.reduce(function (val, fn) {
      return fn(val);
    }, initialValue);
  };
};

var uuid = exports.uuid = function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
};
},{}],28:[function(require,module,exports) {
module.exports = {
  "resumeData": {
    "name": "John Sylvain",
    "title": "Software Engineer",
    "contact": {
      "email": "hi@johnsylvain.me",
      "social": {
        "github": "http://github.com/johnsylvain",
        "linkedin": "http://linkedin.com/in/johnsylvain"
      }
    },
    "education": {
      "school": "Purdue University",
      "gradutionDate": "May 2017",
      "study": {
        "major": "Computer Graphics Technology",
        "minor": "Computer Information Technology"
      }
    },
    "experience": [
      {
        "company": "Rocketmiles",
        "position": "Software Engineer",
        "date": "October 2017 - present"
      },
      {
        "company": "USAA",
        "position": "Software Development Intern",
        "date": "Summer 2016",
        "description": [
          "Worked on a small, agile team primarily focused on enterprise applications.",
          "Developed an AngularJS application to manage business rules.",
          "Analyzed data and created visualizations for the Enterprise Systems Division."
        ]
      },
      {
        "company": "Blast Radius",
        "position": "Web Development Intern",
        "date": "Summer 2015",
        "description": [
          "Developed websites and dynamic emails for a number of blue chip clients.",
          "Aided in the relaunch of the global Blast Radius website"
        ]
      }
    ],
    "projects": [
      {
        "title": "PlaceMorty",
        "description": "Placeholder Image Generator",
        "links": {
          "demo": "http://www.placemorty.us",
          "github": "http://github.com/johnsylvain/placemorty"
        }
      },
      {
        "title": "Pagine",
        "description": "Serverless Markdown website generator",
        "links": {
          "demo": "https://johnsylvain.github.io/pagine",
          "github": "https://github.com/johnsylvain/pagine"
        }
      },
      {
        "title": "URL Shortener",
        "description": "Personal URL shortener",
        "links": {
          "github": "http://github.com/johnsylvain/url-shortener-node"
        }
      },
      {
        "title": "Reddit Showerthoughts Newtab" ,
        "description": "Chrome Extension",
        "links": {
          "download": "http://johnsylva.in/showerthoughts",
          "github": "http://github.com/johnsylvain/reddit-showerthoughts-newtab"
        }
      }
    ],
    "skills": {
      "languages": [
        "JavaScript (ES Next)", "HTML/CSS", "PHP", "C", "C#"
      ],
      "frameworks-and-libraries": [
        "React", "Redux", "Express", "Angular", "Node"
      ],
      "web-tooling": [
        "git", "webpack", "gulp", "ssh", "CSS preprocessors"
      ],
      "database": [
        "SQL", "MongoDB", "Mongoose"
      ]
    }
  }
}
;
},{}],27:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _data = require("../../data.json");

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var model = {
  keyCommands: [{ code: 38, shortcut: null, action: 'UP' }, { code: 40, shortcut: null, action: 'DOWN' }],
  previousCommands: [{
    text: 'type \'help\' to view commands',
    type: 'response',
    _id: 1
  }],
  enteredCommands: {
    data: [],
    currentCommand: '',
    pointer: 0
  },
  currentOutput: null,
  socialProfiles: [],
  commands: [{ text: '', params: null }, { text: 'help', params: null },
  // { text: 'clear', params: null },
  { text: 'pwd', params: null, ignored: true }, { text: 'ls', params: null, ignored: true }, { text: 'email', params: ['<subject>'] }, { text: 'open', params: ['resume', 'pdf'] }, { text: 'show', params: ['education', 'skills', 'xp', 'projects'] }, { text: 'social', params: ['github', 'linkedin'] }, { text: 'rm', params: ['-rf'], ignored: true }],
  defaultMessage: {
    welcomeMessage: ["welcome to my interactive resume!", "to view my resume, type 'open resume' in the terminal to the left", "type 'help' to view other commands"]
  },
  data: _data2.default.resumeData
};

exports.default = model;
},{"../../data.json":28}],25:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require("../utils/events");

var _events2 = _interopRequireDefault(_events);

var _helpers = require("../utils/helpers");

var _data = require("../data");

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Command = function Command(text, type) {
  _classCallCheck(this, Command);

  this.text = text;
  this.type = type;
  this._id = (0, _helpers.uuid)();
};

var controller = {
  init: function init() {
    _data2.default.currentOutput = _data2.default.defaultMessage;

    _events2.default.emit('resumeContentViewInit', null);
    _events2.default.emit('consoleViewInit', null);

    _data2.default.socialProfiles = Object.keys(_data2.default.data.contact.social);
  },
  getResumeData: function getResumeData() {
    return _data2.default.data;
  },
  getDefaultData: function getDefaultData() {
    return _data2.default.defaultMessage;
  },
  getCurrentOutput: function getCurrentOutput() {
    return _data2.default.currentOutput;
  },
  updateOutput: function updateOutput(newOutput) {
    _data2.default.currentOutput = newOutput;
  },
  executeKeypress: function executeKeypress(key) {
    if (key === 'UP' || key === 'DOWN') {
      if (key === 'UP' && _data2.default.enteredCommands.pointer < _data2.default.enteredCommands.data.length) {
        _data2.default.enteredCommands.pointer += 1;
      }
      if (key === 'DOWN' && _data2.default.enteredCommands.pointer > 0) {
        _data2.default.enteredCommands.pointer -= 1;
      }

      var pos = _data2.default.enteredCommands.data.length - _data2.default.enteredCommands.pointer;
      _data2.default.enteredCommands.currentCommand = _data2.default.enteredCommands.data[pos];
    }

    if (key === 'CLEAR') {
      this.executeCommand('clear');
    }

    // consoleView.render();
    _events2.default.emit('consoleViewRender', null);
  },
  getKeyCommands: function getKeyCommands() {
    return _data2.default.keyCommands;
  },
  getEnteredCommands: function getEnteredCommands() {
    return _data2.default.enteredCommands.currentCommand ? _data2.default.enteredCommands.currentCommand : { text: '' };
  },
  getCommand: function getCommand(text) {
    return _data2.default.commands.filter(function (c) {
      return c.text === text;
    });
  },
  getPreviousCommands: function getPreviousCommands() {
    return _data2.default.previousCommands;
  },
  getFileName: function getFileName() {
    return Object.keys(_data2.default.currentOutput)[0];
  },
  enterCommand: function enterCommand(command) {
    command = command.trim();

    var flag = false;
    var args = command.split(' ');

    if (args[0] !== '') {
      var newCommand = new Command(command, 'command');

      _data2.default.previousCommands.push(newCommand);

      var lastCommand = _data2.default.enteredCommands.data[_data2.default.enteredCommands.data.length - 1];
      if (lastCommand) {
        if (command !== lastCommand.text) {
          _data2.default.enteredCommands.data.push(newCommand);
        }
      } else {
        _data2.default.enteredCommands.data.push(newCommand);
      }

      _data2.default.enteredCommands.pointer = 0;
    }

    flag = _data2.default.commands.filter(function (o) {
      return o.text === args[0];
    });

    if (!flag.length) {
      _data2.default.previousCommands.push(new Command('command not found: ' + args[0], 'error'), new Command('to view available commands type: help', 'response'));
    } else {
      this.executeCommand(command);
    }
    // consoleView.render();
    _events2.default.emit('consoleViewRender', null);
  },
  executeCommand: function executeCommand(command) {
    var self = this;
    var comArgs = command.split(' ');

    var commands = {
      pwd: function pwd() {
        if (comArgs.length !== 1) {
          _data2.default.previousCommands.push(new Command("'pwd' does not need any arguments", 'error'));
          // consoleView.render();
          _events2.default.emit('consoleViewRender', null);

          return;
        }

        _data2.default.previousCommands.push(new Command(window.location.host, 'bold'));
      },
      ls: function ls() {
        if (comArgs.length !== 1) {
          _data2.default.previousCommands.push(new Command("'ls' does not need any arguments", 'error'));
          // consoleView.render();
          _events2.default.emit('consoleViewRender', null);

          return;
        }

        _data2.default.previousCommands.push(new Command('index.html', 'response'), new Command('app.js', 'response'), new Command('style.css', 'response'));
      },
      clear: function clear() {
        if (comArgs.length !== 1) {
          _data2.default.previousCommands.push(new Command("'clear' does not need any arguments", 'error'));
          return;
        }

        _data2.default.previousCommands = [];
      },
      help: function help() {
        var commands = _data2.default.commands;
        _data2.default.previousCommands.push(new Command('Available Commands:', 'bold'));
        commands.forEach(function (avalCommand, i) {
          if (avalCommand.ignored !== true && avalCommand.text !== '') {
            var response = avalCommand.params !== null ? "- " + avalCommand.text + " [" + avalCommand.params.toLocaleString() + "]" : "- " + avalCommand.text;

            _data2.default.previousCommands.push(new Command(response, 'response'));
          }
        });
      },
      open: function open() {
        var openResume = function openResume() {
          self.updateOutput({ resume: _data2.default.data });
          _events2.default.emit('resumeContentViewRender', null);
        };

        var pdf = function pdf() {
          window.open("http://johnsylvain.me/resume.pdf");
        };
        if (comArgs.length === 1) {
          _data2.default.previousCommands.push(new Command("type 'open [" + controller.getCommand('open')[0].params + "]'", 'warning'));
        } else {
          return {
            resume: openResume,
            pdf: pdf
          };
        }
      },
      show: function show() {
        var showSection = function showSection(section) {
          return function () {
            self.updateOutput(_defineProperty({}, section, _data2.default.data[section]));
            _events2.default.emit('resumeContentViewRender', null);
          };
        };

        if (comArgs.length === 1) {
          _data2.default.previousCommands.push(new Command("type 'show [" + controller.getCommand('show')[0].params + "]'", 'warning'));
        } else {
          return {
            education: showSection('education'),
            skills: showSection('skills'),
            xp: showSection('experience'),
            projects: showSection('projects')
          };
        }
      },
      email: function email() {
        var subject = '';
        for (var i = 1; i < comArgs.length; i++) {
          subject += ' ' + comArgs[i];
        };
        window.open('mailto:hi@johnsylvain.me?subject=' + subject);
      },
      social: function social() {
        var openLink = function openLink(site) {
          return function () {
            window.open(_data2.default.data.contact.social[site]);
          };
        };

        if (comArgs.length === 1) {
          _data2.default.previousCommands.push(new Command("type 'social [" + controller.getCommand('social')[0].params + "]'", 'warning'));
        } else {
          return {
            github: openLink('github'),
            linkedin: openLink('linkedin')
          };
        }
      },
      rm: function rm() {
        var rf = function rf() {
          var targets = [document.getElementById('wrapper'), document.getElementsByClassName('trash')];

          document.getElementById('command-input').disabled = true;
          targets.forEach(function (el, i) {
            if (Array.from(el)[0]) {
              Array.from(el).forEach(function (e) {
                e.classList.add('crash');
              });
            } else {
              el.classList.add('crash');
            }
          });
          window.setTimeout(function () {
            document.getElementById('command-input').disabled = false;

            targets.forEach(function (el, i) {
              if (Array.from(el)[0]) {
                Array.from(el).forEach(function (e) {
                  e.classList.remove('crash');
                });
              } else {
                el.classList.remove('crash');
              }
            });

            document.getElementById('command-input').focus();
          }, 4000);
        };

        if (comArgs.length === 1) {
          _data2.default.previousCommands.push(new Command('error', 'error'));
        } else {
          return {
            '-rf': rf
          };
        }
      }
    };

    _data2.default.enteredCommands.pointer = 0;
    _data2.default.enteredCommands.currentCommand = '';
    // consoleView.render();
    _events2.default.emit('resumeContentViewRender', null);

    if (comArgs.length === 1) {
      commands[comArgs[0]]();
    } else if (comArgs[0] === 'email') {
      commands[comArgs[0]]();
    } else if (comArgs.length > 1) {
      var subCommand = commands[comArgs[0]]();
      if (subCommand[comArgs[1]]) {
        subCommand[comArgs[1]]();
      } else {
        _data2.default.previousCommands.push(new Command(comArgs[1] + ' is not a proper parameter of \'' + comArgs[0] + '\'', 'error'));
      }
    }
  }
};

exports.default = controller;
},{"../utils/events":12,"../utils/helpers":13,"../data":27}],24:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textToJSON = textToJSON;
exports.findUrls = findUrls;
function textToJSON(json) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, null, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  var reg = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
  return json.replace(reg, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}

function findUrls(text) {
  var reg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)(?:[\.\!\/\\\w]*))?)/g;
  return text.replace(reg, function (match) {
    var url = match.replace('</span>', String.empty);
    return '<a href="' + url + '" target="_blank">' + match + '</a>';
  });
}
},{}],23:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.h = h;
exports.render = render;
function h(nodeName, attributes) {
  var _ref;

  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    nodeName: nodeName,
    attributes: attributes || {},
    children: (_ref = []).concat.apply(_ref, children) // flatten children array
  };
}

function createElement(vnode) {
  if (typeof vnode === 'string') return document.createTextNode(vnode);

  var node = document.createElement(vnode.nodeName);

  for (var name in vnode.attributes) {
    if (/^on/.test(name)) //  test if event
      node.addEventListener(name.slice(2).toLowerCase(), vnode.attributes[name]);else {
      if (name === 'className') node.setAttribute('class', vnode.attributes[name]);else if (name === '__html') node.innerHTML = vnode.attributes[name];else node.setAttribute(name, vnode.attributes[name]);
    }
  }

  for (var i = 0; i < vnode.children.length; i++) {
    node.appendChild(createElement(vnode.children[i]));
  }return node;
}

function changed(node1, node2) {
  return (typeof node1 === "undefined" ? "undefined" : _typeof(node1)) !== (typeof node2 === "undefined" ? "undefined" : _typeof(node2)) || typeof node1 === 'string' && node1 !== node2 || node1.nodeName !== node2.nodeName || node1.attributes && node1.attributes.forceUpdate;
}

function render(parent, newNode, oldNode) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if (!oldNode) parent.appendChild(createElement(newNode));else if (!newNode) parent.removeChild(parent.childNodes[index]);else if (changed(newNode, oldNode)) {
    parent.replaceChild(createElement(newNode), parent.childNodes[index]);
  } else if (newNode.nodeName) {
    var newLength = newNode.children.length;
    var oldLength = oldNode.children.length;
    for (var i = 0; i < newLength || i < oldLength; i++) {
      render(parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
    }
  }

  // return new virtual dom
  return newNode;
}
},{}],15:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require("../controller");

var _controller2 = _interopRequireDefault(_controller);

var _events = require("../utils/events");

var _events2 = _interopRequireDefault(_events);

var _filters = require("../utils/filters");

var filters = _interopRequireWildcard(_filters);

var _helpers = require("../utils/helpers");

var _dom = require("../utils/dom");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_events2.default.on('resumeContentViewInit', function (data) {
  resumeContentView.init();
});
_events2.default.on('resumeContentViewRender', function (data) {
  resumeContentView.render();
});

var resumeContentView = {
  init: function init() {
    this.vdom = null;
    this.render();
  },
  render: function render() {
    var data = _controller2.default.getCurrentOutput();
    var json = (0, _helpers.compose)(function (d) {
      return JSON.stringify(d, null, '   ');
    }, filters.textToJSON, filters.findUrls)(data);

    var vnodes = (0, _dom.h)(
      "div",
      null,
      (0, _dom.h)(
        "div",
        { "class": "menu-bar clearfix" },
        (0, _dom.h)("div", { "class": "menu-bar__circle" }),
        (0, _dom.h)("div", { "class": "menu-bar__circle" }),
        (0, _dom.h)("div", { "class": "menu-bar__circle" }),
        (0, _dom.h)(
          "span",
          { "class": "menu-bar__title" },
          _controller2.default.getFileName(),
          ".json"
        )
      ),
      (0, _dom.h)(
        "div",
        { id: "resume-content" },
        (0, _dom.h)("pre", { __html: json, forceUpdate: true })
      )
    );

    this.vdom = (0, _dom.render)(document.querySelector('#resume-wrapper'), vnodes, this.vdom);
  }
};

exports.default = resumeContentView;
},{"../controller":25,"../utils/events":12,"../utils/filters":24,"../utils/helpers":13,"../utils/dom":23}],14:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require("../controller");

var _controller2 = _interopRequireDefault(_controller);

var _events = require("../utils/events");

var _events2 = _interopRequireDefault(_events);

var _dom = require("../utils/dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_events2.default.on('consoleViewInit', function (data) {
  consoleView.init();
});

_events2.default.on('consoleViewRender', function (data) {
  consoleView.render();
});

var consoleView = {
  init: function init() {
    this.vdom = null;
    this.render();
    this.bindEvents();
  },
  bindEvents: function bindEvents() {
    var consoleContainer = document.getElementById('console-selector');

    consoleContainer.addEventListener('click', function (e) {
      document.getElementById('command-input').focus();
    });
  },
  render: function render() {
    var handleSubmit = function handleSubmit(e) {
      e.preventDefault();
      _controller2.default.enterCommand(e.target.prompt.value);
      e.target.prompt.value = '';
    };

    // Create virtual dom from jsx
    var vnodes = (0, _dom.h)(
      "div",
      null,
      (0, _dom.h)(
        "ul",
        { className: "console__command-list" },
        _controller2.default.getPreviousCommands().map(function (command) {
          return (0, _dom.h)(
            "li",
            { key: command._id, className: "console__command-list-item console__command-list-item--" + command.type },
            command.type === 'command' ? "$ " + command.text : command.text
          );
        })
      ),
      (0, _dom.h)(
        "form",
        { onSubmit: handleSubmit },
        (0, _dom.h)(
          "span",
          null,
          "$\xA0"
        ),
        (0, _dom.h)("input", {
          type: "text",
          name: "prompt",
          id: "command-input",
          className: "console__prompt",
          autocomplete: "off",
          value: _controller2.default.getEnteredCommands().text,
          forceUpdate: true
        })
      )
    );

    // diff dom and render into container
    this.vdom = (0, _dom.render)(document.getElementById('commands'), // container
    vnodes, this.vdom);

    // alway focus the input
    document.getElementById('command-input').focus();
  }
};

exports.default = consoleView;
},{"../controller":25,"../utils/events":12,"../utils/dom":23}],26:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error;
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;

},{}],16:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;

},{"./bundle-url":26}],10:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"./../img/code.svg":["6b2464138e6007a5b2cbb14c4297f053.svg",17],"./../img/close.svg":["a717742370bca4696c981b24803ddc0d.svg",18],"_css_loader":16}],9:[function(require,module,exports) {
"use strict";

var _router = require("./utils/router");

var _router2 = _interopRequireDefault(_router);

var _events = require("./utils/events");

var _events2 = _interopRequireDefault(_events);

var _helpers = require("./utils/helpers");

var _controller = require("./controller");

var _controller2 = _interopRequireDefault(_controller);

var _resumeContent = require("./views/resumeContent");

var _resumeContent2 = _interopRequireDefault(_resumeContent);

var _console = require("./views/console");

var _console2 = _interopRequireDefault(_console);

require("../styles/style.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = {
  pageWidth: window.innerWidth,
  breakpoint: 768,
  interactiveMode: false,

  init: function init() {
    var _this = this;

    _controller2.default.init();

    var routes = [{
      path: '/',
      controller: function controller() {
        _events2.default.emit('switchModes', { flag: true });
      }
    }, {
      path: '/resume',
      controller: function controller() {
        _events2.default.emit('switchModes', { flag: false });
        if (window.innerWidth <= _this.breakpoint) {
          router.go({ route: '#/' });
        }
      }
    }];
    var router = new _router2.default(routes);

    window.addEventListener('keyup', this.handleKeypress.bind(this));

    document.querySelectorAll('.toggle-btn').forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault();
        router.go({ route: event.target.href });
      });
    });

    window.addEventListener('resize', (0, _helpers.throttle)(function (event) {
      if (window.innerWidth <= _this.breakpoint) {
        router.go({ route: '#/' });
      }
    }, 250, this));

    _events2.default.on('switchModes', function (data) {
      _this.switchModes(data.flag);
    });

    document.querySelector('#date-selector').textContent = new Date().getFullYear().toString();
  },
  handleKeypress: function handleKeypress(e) {
    var availableKeys = _controller2.default.getKeyCommands();
    var keyPress = availableKeys.find(function (key) {
      return key.shortcut ? key.code === e.which && e[key.shortcut] : key.code === e.which;
    });

    if (keyPress) _controller2.default.executeKeypress(keyPress.action);
  },
  switchModes: function switchModes(flag) {
    var btn = document.getElementById('toggle-interactive');

    var targets = [document.getElementById('page-wrap'), document.getElementById('landing-wrapper'), document.getElementById('resume-wrapper'), document.getElementById('console-selector'), document.getElementById('container'), document.getElementById('toggle-interactive')];

    if (flag) {
      targets.forEach(function (t) {
        t.classList.remove('interactiveMode');
        t.classList.add('nonInteractiveMode');
      });
      this.interactiveMode = false;
      btn.setAttribute('href', '#/resume');
      return;
    }

    if (!this.interactiveMode) {
      targets.forEach(function (t) {
        t.classList.add('interactiveMode');
        t.classList.remove('nonInteractiveMode');
      });
      btn.setAttribute('href', '#/');
    } else {
      targets.forEach(function (t) {
        t.classList.remove('interactiveMode');
        t.classList.add('nonInteractiveMode');
      });
      btn.setAttribute('href', '#/resume');
    }
    this.interactiveMode = !this.interactiveMode;
  }
};

app.init();
},{"./utils/router":11,"./utils/events":12,"./utils/helpers":13,"./controller":25,"./views/resumeContent":15,"./views/console":14,"../styles/style.scss":10}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://' + window.location.hostname + ':61544/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,9])