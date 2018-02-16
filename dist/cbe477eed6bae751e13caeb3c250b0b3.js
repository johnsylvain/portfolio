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
},{}],13:[function(require,module,exports) {
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
},{}],12:[function(require,module,exports) {
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
},{}],30:[function(require,module,exports) {
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
},{}],29:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _data = require("./data.json");

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var model = {
  keyCommands: [{ code: 38, shortcut: null, action: 'UP' }, { code: 40, shortcut: null, action: 'DOWN' }, { code: 75, shortcut: 'ctrlKey', action: 'CLEAR' }],
  commandList: [{
    text: 'type \'help\' to view commands',
    type: 'response'
  }],
  enteredCommands: {
    data: [],
    currentCommand: '',
    pointer: 0
  },
  currentOutput: null,
  commands: [{ text: '', params: null }, { text: 'help', params: null }, { text: 'clear', params: null }, { text: 'pwd', params: null, ignored: true }, { text: 'ls', params: null, ignored: true }, { text: 'email', params: ['<subject>'] }, { text: 'open', params: ['resume', 'pdf'] }, { text: 'show', params: ['education', 'skills', 'xp', 'projects'] }, { text: 'social', params: ['github', 'linkedin'] }, { text: 'rm', params: ['-rf'], ignored: true }],
  defaultMessage: {
    welcomeMessage: ["welcome to my interactive resume!", "to view my resume, type 'open resume' in the terminal to the left", "type 'help' to view other commands"]
  },
  data: _data2.default.resumeData
};

exports.default = model;
},{"./data.json":30}],27:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require("../utils/events");

var _events2 = _interopRequireDefault(_events);

var _data = require("../data");

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var controller = {
  init: function init() {
    _data2.default.currentOutput = _data2.default.defaultMessage;
  },
  getCurrentOutput: function getCurrentOutput() {
    return _data2.default.currentOutput;
  },
  updateOutput: function updateOutput(newOutput) {
    _data2.default.currentOutput = newOutput;
  },
  executeKeypress: function executeKeypress(key) {
    if (key === 'UP' || key === 'DOWN') {
      if (key === 'UP' && _data2.default.enteredCommands.pointer < _data2.default.enteredCommands.data.length) _data2.default.enteredCommands.pointer++;

      if (key === 'DOWN' && _data2.default.enteredCommands.pointer > 0) _data2.default.enteredCommands.pointer--;

      var pos = _data2.default.enteredCommands.data.length - _data2.default.enteredCommands.pointer;
      _data2.default.enteredCommands.currentCommand = _data2.default.enteredCommands.data[pos];
    }

    if (key === 'CLEAR') this.executeCommand('clear');

    _events2.default.emit('consoleViewRender');
  },
  getKeyCommands: function getKeyCommands() {
    return _data2.default.keyCommands;
  },
  getEnteredCommands: function getEnteredCommands() {
    return _data2.default.enteredCommands.currentCommand ? _data2.default.enteredCommands.currentCommand : { text: '' };
  },
  getCommand: function getCommand(text) {
    return _data2.default.commands.find(function (c) {
      return c.text === text;
    });
  },
  getCommandList: function getCommandList() {
    return _data2.default.commandList;
  },
  getFileName: function getFileName() {
    return Object.keys(_data2.default.currentOutput)[0];
  },
  enterCommand: function enterCommand(command) {
    command = command.trim();

    var args = command.split(' ');
    var newCommand = { text: command, type: 'command' };
    var lastCommand = _data2.default.enteredCommands.data[_data2.default.enteredCommands.data.length - 1];
    var flag = _data2.default.commands.find(function (o) {
      return o.text === args[0];
    });

    _data2.default.commandList.push(newCommand);

    if (args[0] !== '' && (!lastCommand || command !== lastCommand.text)) _data2.default.enteredCommands.data.push(newCommand);

    _data2.default.enteredCommands.pointer = 0;

    if (!flag) {
      _data2.default.commandList.push({ text: 'command not found: ' + args[0], type: 'error' }, { text: 'to view available commands type: help', type: 'response' });
      _events2.default.emit('consoleViewRender');
    } else {
      this.executeCommand(command);
    }
  },
  executeCommand: function executeCommand(command) {
    var self = this;
    var comArgs = command.split(' ');

    var checkArguments = function checkArguments(expected, name) {
      if (comArgs.length - 1 !== expected) {
        _data2.default.commandList.push({ text: "'" + name + "' does not need any arguments", type: 'error' });
        return;
      }
    };

    var commands = {
      pwd: function pwd() {
        checkArguments(controller.getCommand('pwd').params || 0, 'pwd');

        _data2.default.commandList.push({ text: window.location.host, type: 'bold' });
      },
      ls: function ls() {
        checkArguments(controller.getCommand('ls').params || 0, 'ls');

        _data2.default.commandList.push({ text: 'index.html', type: 'response' }, { text: 'app.js', type: 'response' }, { text: 'style.css', type: 'response' });
      },
      clear: function clear() {
        checkArguments(controller.getCommand('clear').params || 0, 'clear');

        _data2.default.commandList = [];
      },
      help: function help() {
        checkArguments(controller.getCommand('help').params || 0, 'help');

        var commands = _data2.default.commands;
        _data2.default.commandList.push({ text: 'Available Commands:', type: 'bold' });
        commands.forEach(function (avalCommand, i) {
          if (avalCommand.ignored !== true && avalCommand.text !== '') {
            var response = avalCommand.params !== null ? "- " + avalCommand.text + " [" + avalCommand.params.toLocaleString() + "]" : "- " + avalCommand.text;

            _data2.default.commandList.push({ text: response, type: 'response' });
          }
        });
      },
      open: function open() {
        var openResume = function openResume() {
          self.updateOutput({ resume: _data2.default.data });
        };

        var pdf = function pdf() {
          window.open("http://johnsylvain.me/resume.pdf");
        };
        if (comArgs.length === 1) {
          _data2.default.commandList.push({ text: "type 'open [" + controller.getCommand('open').params + "]'", type: 'warning' });
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
          };
        };

        if (comArgs.length === 1) {
          _data2.default.commandList.push({ text: "type 'show [" + controller.getCommand('show').params + "]'", type: 'warning' });
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
        var subject = comArgs.slice(1).reduce(function (s, w) {
          return s + " " + w;
        });

        window.open("mailto:hi@johnsylvain.me?subject=" + subject);
      },
      social: function social() {
        var openLink = function openLink(site) {
          return function () {
            window.open(_data2.default.data.contact.social[site]);
          };
        };

        if (comArgs.length === 1) {
          _data2.default.commandList.push({ text: "type 'social [" + controller.getCommand('social').params + "]'", type: 'warning' });
        } else {
          return {
            github: openLink('github'),
            linkedin: openLink('linkedin')
          };
        }
      },
      rm: function rm() {
        var rf = function rf() {
          var targets = [document.querySelector('#wrapper'), document.querySelectorAll('.trash')];

          document.querySelector('#command-input').disabled = true;
          targets.forEach(function (el) {
            if (Array.from(el)[0]) {
              el.forEach(function (e) {
                e.classList.add('crash');
              });
            } else {
              el.classList.add('crash');
            }
          });
          window.setTimeout(function () {
            document.querySelector('#command-input').disabled = false;
            targets.forEach(function (el) {
              if (Array.from(el)[0]) {
                el.forEach(function (e) {
                  e.classList.remove('crash');
                });
              } else {
                el.classList.remove('crash');
              }
            });
            document.querySelector('#command-input').focus();
          }, 4000);
        };

        if (comArgs.length === 1) {
          _data2.default.commandList.push({ text: "please specify a path", type: 'warning' });
        } else {
          return {
            '-rf': rf
          };
        }
      }
    };

    _data2.default.enteredCommands.pointer = 0;
    _data2.default.enteredCommands.currentCommand = '';

    if (comArgs[0] !== '' && comArgs.length === 1 || comArgs[0] === 'email') {
      commands[comArgs[0]]();
    } else if (comArgs.length > 1) {
      var subCommand = commands[comArgs[0]]();
      if (subCommand[comArgs[1]]) {
        subCommand[comArgs[1]]();
      } else {
        _data2.default.commandList.push({ text: comArgs[1] + ' is not a proper parameter of \'' + comArgs[0] + '\'', type: 'error' });
      }
    }
    _events2.default.emit('resumeContentViewRender');
    _events2.default.emit('consoleViewRender');
  }
};

exports.default = controller;
},{"../utils/events":13,"../data":29}],25:[function(require,module,exports) {
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
},{}],26:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.h = h;
exports.render = render;
function h(nodeName, attributes) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  children = [].concat.apply([], children);
  attributes = attributes || {};

  return typeof nodeName === 'function' ? nodeName(attributes, children) : { nodeName: nodeName, attributes: attributes, children: children };
}

function render(vnodes, parent) {
  var el = createElement(vnodes);

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }parent.appendChild(el);
}

function createElement(vnode) {
  var node = typeof vnode === "string" || typeof vnode === "number" ? document.createTextNode(vnode) : document.createElement(vnode.nodeName);

  if (vnode.attributes) {
    setAttributes(node, vnode.attributes);

    vnode.children.map(createElement).forEach(node.appendChild.bind(node));
  }

  return node;
}

function setAttributes(node, attributes) {
  for (var name in attributes) {
    if (/^on/.test(name)) {
      node.addEventListener(name.slice(2).toLowerCase(), attributes[name]);
    } else {
      switch (name) {
        case 'className':
          node.setAttribute('class', attributes[name]);
          break;
        case 'dangerouslySetInnerHTML':
          node.innerHTML = attributes[name].__html;
          break;
        default:
          node.setAttribute(name, attributes[name]);
      }
    }
  }
}
},{}],14:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("../controller");

var _controller2 = _interopRequireDefault(_controller);

var _events = require("../utils/events");

var _events2 = _interopRequireDefault(_events);

var _filters = require("../utils/filters");

var filters = _interopRequireWildcard(_filters);

var _helpers = require("../utils/helpers");

var _vdom = require("../utils/vdom");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResumeView = function () {
  function ResumeView() {
    _classCallCheck(this, ResumeView);

    this.render();
    this.bindEvents();
  }

  _createClass(ResumeView, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;

      _events2.default.on('resumeContentViewRender', function (data) {
        _this.render();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var data = _controller2.default.getCurrentOutput();
      var json = (0, _helpers.compose)(function (d) {
        return JSON.stringify(d, null, '  ');
      }, filters.textToJSON, filters.findUrls)(data);

      var Resume = function Resume() {
        return (0, _vdom.h)(
          "div",
          null,
          (0, _vdom.h)(
            "div",
            { className: "menu-bar" },
            (0, _vdom.h)("div", { className: "menu-bar__circle" }),
            (0, _vdom.h)("div", { className: "menu-bar__circle" }),
            (0, _vdom.h)("div", { className: "menu-bar__circle" }),
            (0, _vdom.h)(
              "span",
              { className: "menu-bar__title" },
              _controller2.default.getFileName(),
              ".json"
            )
          ),
          (0, _vdom.h)(
            "div",
            { id: "resume-content" },
            (0, _vdom.h)("pre", { dangerouslySetInnerHTML: { __html: json } })
          )
        );
      };

      (0, _vdom.render)((0, _vdom.h)(Resume, null), document.querySelector('#resume-selector'));
    }
  }]);

  return ResumeView;
}();

exports.default = ResumeView;
},{"../controller":27,"../utils/events":13,"../utils/filters":25,"../utils/helpers":12,"../utils/vdom":26}],15:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("../controller");

var _controller2 = _interopRequireDefault(_controller);

var _events = require("../utils/events");

var _events2 = _interopRequireDefault(_events);

var _vdom = require("../utils/vdom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConsoleView = function () {
  function ConsoleView() {
    _classCallCheck(this, ConsoleView);

    this.render();
    this.bindEvents();
  }

  _createClass(ConsoleView, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;

      var consoleContainer = document.getElementById('console-selector');

      consoleContainer.addEventListener('click', function (e) {
        document.getElementById('command-input').focus();
      });

      _events2.default.on('consoleViewRender', function (data) {
        _this.render();
      });

      window.addEventListener('keyup', function (e) {
        var availableKeys = _controller2.default.getKeyCommands();
        var keyPress = availableKeys.find(function (key) {
          return key.shortcut ? key.code === e.which && e[key.shortcut] : key.code === e.which;
        });

        if (keyPress && document.activeElement.id === 'command-input') _controller2.default.executeKeypress(keyPress.action);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var handleSubmit = function handleSubmit(e) {
        e.preventDefault();
        _controller2.default.enterCommand(e.target.prompt.value);
        e.target.prompt.value = '';
      };

      var commandList = _controller2.default.getCommandList();

      var Console = function Console() {
        return (0, _vdom.h)(
          "div",
          { className: "console", id: "commands" },
          (0, _vdom.h)(
            "ul",
            { className: "console__command-list" },
            commandList.map(function (command) {
              return (0, _vdom.h)(
                "li",
                { className: "console__command-list-item console__command-list-item--" + command.type },
                command.type === 'command' ? "$ " + command.text : command.text
              );
            })
          ),
          (0, _vdom.h)(
            "form",
            { onSubmit: handleSubmit },
            (0, _vdom.h)(
              "span",
              null,
              "$\xA0"
            ),
            (0, _vdom.h)("input", {
              type: "text",
              name: "prompt",
              id: "command-input",
              className: "console__prompt",
              autocomplete: "off",
              value: _controller2.default.getEnteredCommands().text
            })
          )
        );
      };

      (0, _vdom.render)((0, _vdom.h)(Console, null), document.querySelector('#console-selector'));

      // alway focus the input
      document.querySelector('#command-input').focus();
    }
  }]);

  return ConsoleView;
}();

exports.default = ConsoleView;
},{"../controller":27,"../utils/events":13,"../utils/vdom":26}],28:[function(require,module,exports) {
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

},{"./bundle-url":28}],10:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"./../assets/code.svg":["19ed30da515e33214aeaa95001ea1c50.svg",17],"./../assets/close.svg":["121e3f06e0d43ad36ad24c13b72675a9.svg",18],"_css_loader":16}],9:[function(require,module,exports) {
"use strict";

var _router = require("./utils/router.js");

var _router2 = _interopRequireDefault(_router);

var _events = require("./utils/events");

var _events2 = _interopRequireDefault(_events);

var _helpers = require("./utils/helpers");

var _controller = require("./controller");

var _controller2 = _interopRequireDefault(_controller);

var _resume = require("./views/resume");

var _resume2 = _interopRequireDefault(_resume);

var _console = require("./views/console");

var _console2 = _interopRequireDefault(_console);

require("../styles/style.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = {
  breakpoint: 768,
  interactiveMode: false,

  init: function init() {
    var _this = this;

    _controller2.default.init();
    new _resume2.default();
    new _console2.default();

    this.bindEvents();

    this.router = new _router2.default([{
      path: '/',
      controller: function controller() {
        _events2.default.emit('switchModes', { flag: true });
      }
    }, {
      path: '/resume',
      controller: function controller() {
        _events2.default.emit('switchModes', { flag: false });
        if (window.innerWidth <= _this.breakpoint) _this.router.go({ route: '#/' });
      }
    }]);

    document.querySelector('#date-selector').textContent = new Date().getFullYear().toString();
  },
  bindEvents: function bindEvents() {
    var _this2 = this;

    document.querySelectorAll('.toggle-btn').forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault();
        _this2.router.go({ route: event.target.href });
      });
    });

    window.addEventListener('resize', (0, _helpers.throttle)(function (event) {
      if (window.innerWidth <= _this2.breakpoint) {
        _this2.router.go({ route: '#/' });
      }
    }, 250, this));

    _events2.default.on('switchModes', function (data) {
      _this2.switchModes(data.flag);
    });
  },
  switchModes: function switchModes(flag) {
    var btn = document.getElementById('toggle-interactive');
    var targets = [document.getElementById('page-wrap'), document.getElementById('landing-wrapper'), document.getElementById('resume-selector'), document.getElementById('console-selector'), document.getElementById('container-selector'), document.getElementById('toggle-interactive')];

    if (flag) {
      targets.forEach(function (t) {
        t.classList.remove('interactive-mode');
      });
      this.interactiveMode = false;
      btn.setAttribute('href', '#/resume');
      return;
    }

    if (!this.interactiveMode) {
      targets.forEach(function (t) {
        t.classList.add('interactive-mode');
      });
      btn.setAttribute('href', '#/');
    } else {
      targets.forEach(function (t) {
        t.classList.remove('interactive-mode');
      });
      btn.setAttribute('href', '#/resume');
    }
    this.interactiveMode = !this.interactiveMode;
  }
};

app.init();
},{"./utils/router.js":11,"./utils/events":13,"./utils/helpers":12,"./controller":27,"./views/resume":14,"./views/console":15,"../styles/style.scss":10}],0:[function(require,module,exports) {
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
  var ws = new WebSocket('ws://' + window.location.hostname + ':65068/');
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