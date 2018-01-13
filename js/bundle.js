(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _router = require('./utils/router');

var _router2 = _interopRequireDefault(_router);

var _events = require('./utils/events');

var _events2 = _interopRequireDefault(_events);

var _helpers = require('./utils/helpers');

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _resumeContentView = require('./views/resumeContentView');

var _resumeContentView2 = _interopRequireDefault(_resumeContentView);

var _consoleView = require('./views/consoleView');

var _consoleView2 = _interopRequireDefault(_consoleView);

var _mainView = require('./views/mainView');

var _mainView2 = _interopRequireDefault(_mainView);

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

    Array.from(document.getElementsByClassName('toggle-btn')).forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        router.go({ route: e.target.href });
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
      btn.setAttribute('data-tooltip', 'CLI Resume');
      return;
    }
    if (!this.interactiveMode) {
      targets.forEach(function (t) {
        t.classList.add('interactiveMode');
        t.classList.remove('nonInteractiveMode');
      });
      btn.setAttribute('href', '#/');
      btn.setAttribute('data-tooltip', 'Close CLI Resume');
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

},{"./controller":2,"./utils/events":5,"./utils/helpers":7,"./utils/router":8,"./views/consoleView":9,"./views/mainView":10,"./views/resumeContentView":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _data = require('../data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {
  init: function init() {
    _data2.default.currentOutput = _data2.default.defaultMessage;

    _events2.default.emit('resumeContentViewInit', null);
    _events2.default.emit('consoleViewInit', null);
    _events2.default.emit('viewInit', null);

    this.loadResumeData().then(function (res) {
      _data2.default.data = res;
      _data2.default.socialProfiles = Object.keys(_data2.default.data.contact.social);
    }).catch(function (err) {
      console.error(err);
    });
  },
  fetchData: function fetchData(method, url) {
    var xhr;

    if (window.XMLHttpRequest) {
      // Mozilla, Safari, ...
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      // IE
      try {
        xhr = new ActiveXObject('Msxml2.XMLHTTP');
      } catch (e) {
        try {
          xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (e) {}
      }
    }

    return new Promise(function (resolve, reject) {

      xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
          resolve({
            data: JSON.parse(xhr.responseText),
            status: this.status
          });
        } else {
          reject(new Error('Could not retrieve data from: ' + url));
        }
      };

      xhr.onerror = function (e) {
        reject({ error: e });
      };

      xhr.open(method, url, true);
      xhr.send();
    });
  },
  loadResumeData: function loadResumeData() {
    var _this = this;

    return new Promise(function (resolve, reject) {
      _this.fetchData('GET', './data.json').then(function (res) {
        resolve(res.data.resumeData);
      }).catch(function (err) {
        reject(err);
      });
    });
  },
  getDate: function getDate() {
    return _data2.default.date;
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
    return new Promise(function (resolve, reject) {
      _data2.default.currentOutput = newOutput;
      resolve();
    });
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
    return _data2.default.enteredCommands.currentCommand;
  },
  getCommand: function getCommand(text) {
    return _data2.default.commands.filter(function (c) {
      return c.text === text;
    });
  },
  enterCommand: function enterCommand(command) {
    command = command.trim();

    var flag = false;
    var args = command.split(' ');

    if (args[0] !== '') {
      _data2.default.previousCommands.push({
        text: command,
        type: 'command'
      });

      var lastCommand = _data2.default.enteredCommands.data[_data2.default.enteredCommands.data.length - 1];
      if (lastCommand) {
        if (command !== lastCommand.text) {
          _data2.default.enteredCommands.data.push({
            text: command,
            type: 'command'
          });
        }
      } else {
        _data2.default.enteredCommands.data.push({
          text: command,
          type: 'command'
        });
      }

      _data2.default.enteredCommands.pointer = 0;
    }

    flag = _data2.default.commands.filter(function (o) {
      return o.text === args[0];
    });

    if (!flag.length) {
      _data2.default.previousCommands.push({
        text: 'command not found: ' + args[0],
        type: 'error'
      }, {
        text: 'to view available commands type: help',
        type: 'response'
      });
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
          _data2.default.previousCommands.push({
            text: "'pwd' does not need any arguments",
            type: 'error'
          });
          // consoleView.render();
          _events2.default.emit('consoleViewRender', null);

          return;
        }

        _data2.default.previousCommands.push({
          text: window.location.host,
          type: 'response-bold'
        });
      },
      ls: function ls() {
        if (comArgs.length !== 1) {
          _data2.default.previousCommands.push({
            text: "'ls' does not need any arguments",
            type: 'error'
          });
          // consoleView.render();
          _events2.default.emit('consoleViewRender', null);

          return;
        }

        _data2.default.previousCommands.push({ text: "index.html", type: 'response' }, { text: "main.js", type: 'response' }, { text: "style.css", type: 'response' });
      },
      clear: function clear() {
        if (comArgs.length !== 1) {
          _data2.default.previousCommands.push({
            text: "'clear' does not need any arguments",
            type: 'error'
          });
          return;
        }

        _data2.default.previousCommands = [];
      },
      help: function help() {
        var commands = _data2.default.commands;
        _data2.default.previousCommands.push({ text: 'Available Commands:', type: 'response-bold' });
        commands.forEach(function (avalCommand, i) {
          if (avalCommand.ignored !== true) {
            var response = '';
            if (avalCommand.params !== null) {
              response = avalCommand.text + ' [' + avalCommand.params.toLocaleString() + ']';
            } else {
              response = avalCommand.text;
            }
            _data2.default.previousCommands.push({
              text: response,
              type: 'response'
            });
          }
        });
      },
      open: function open() {
        var openResume = function openResume() {
          self.updateOutput({ resume: _data2.default.data }).then(function (res) {
            // resumeContentView.render();
            _events2.default.emit('resumeContentViewRender', null);
          });
        };

        var pdf = function pdf() {
          window.open("http://johnsylvain.me/resume.pdf");
        };
        if (comArgs.length === 1) {
          _data2.default.previousCommands.push({
            text: "type 'open [" + controller.getCommand('open')[0].params + "]'",
            type: 'warning'
          });
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
            var obj = {};
            obj[section] = _data2.default.data[section];
            self.updateOutput(obj).then(function () {
              // resumeContentView.render();
              _events2.default.emit('resumeContentViewRender', null);
            });
          };
        };

        if (comArgs.length === 1) {
          _data2.default.previousCommands.push({
            text: "type 'show [" + controller.getCommand('show')[0].params + "]'",
            type: 'warning'
          });
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
        var link = 'mailto:hi@johnsylvain.me?subject=' + subject;
        window.open(link);
      },
      social: function social() {
        var openLink = function openLink(site) {
          return function () {
            window.open(_data2.default.data.contact.social[site]);
          };
        };

        if (comArgs.length === 1) {
          _data2.default.previousCommands.push({
            text: "type 'social [" + controller.getCommand('social')[0].params + "]'",
            type: 'warning'
          });
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
          _data2.default.previousCommands.push({
            text: "error",
            type: 'error'
          });
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
        _data2.default.previousCommands.push({
          text: comArgs[1] + ' is not a proper parameter of \'' + comArgs[0] + '\'',
          type: 'error'
        });
      }
    }
  },
  getPreviousCommands: function getPreviousCommands() {
    return _data2.default.previousCommands;
  },
  getFileName: function getFileName() {
    return Object.keys(_data2.default.currentOutput)[0];
  }
};

exports.default = controller;

},{"../data":3,"../utils/events":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var model = {
  keyCommands: [{ code: 38, shortcut: null, action: 'UP' }, { code: 40, shortcut: null, action: 'DOWN' }, { code: 75, shortcut: 'ctrlKey', action: 'CLEAR' }],
  previousCommands: [{
    text: 'type \'help\' to view commands',
    type: 'response'
  }],
  enteredCommands: {
    data: [],
    currentCommand: '',
    pointer: 0
  },
  currentOutput: null,
  socialProfiles: [],
  commands: [{ text: '', params: null }, { text: 'help', params: null }, { text: 'clear', params: null }, { text: 'pwd', params: null, ignored: true }, { text: 'ls', params: null, ignored: true }, { text: 'email', params: ['<subject>'] }, { text: 'open', params: ['resume', 'pdf'] }, { text: 'show', params: ['education', 'skills', 'xp', 'projects'] }, { text: 'social', params: ['github', 'linkedin'] }, { text: 'rm', params: ['-rf'], ignored: true }],
  defaultMessage: {
    welcomeMessage: ["welcome to my interactive resume!", "to view my resume, type 'open resume' in the terminal to the left", "type 'help' to view other commands"]
  },
  data: {},
  date: new Date().getFullYear()
};

exports.default = model;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.element = element;
function element(type, attrs, child) {
  var e = document.createElement(type);

  for (var attr in attrs) {
    e.setAttribute(attr === 'className' ? 'class' : attr, attrs[attr]);
  }if (typeof child === 'string') e.textContent = child;else e.appendChild(child);

  return e;
}

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var filters = {
  textToJSON: function textToJSON(json) {
    if (typeof json != 'string') {
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
  },
  findUrls: function findUrls(text) {
    var reg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)(?:[\.\!\/\\\w]*))?)/g;
    return text.replace(reg, function (match) {
      var url = match.replace('</span>', String.empty);
      return '<a href="' + url + '" target="_blank">' + match + '</a>';
    });
  }
};

exports.default = filters;

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
'use strict';

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
    key: 'go',
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
    key: 'addRoute',
    value: function addRoute(path, controller) {
      this.routes[path] = { controller: controller };
    }
  }]);

  return Router;
}();

exports.default = Router;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('../controller');

var _controller2 = _interopRequireDefault(_controller);

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _dom = require('../utils/dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_events2.default.on('consoleViewInit', function (data) {
  consoleView.init();
});

_events2.default.on('consoleViewRender', function (data) {
  consoleView.render();
});

var consoleView = {
  init: function init() {
    var _this = this;

    this.classMap = {
      'command': '',
      'error': 'console__command-list-item--error',
      'response': 'console__command-list-item--response',
      'response-bold': 'console__command-list-item--bold',
      'warning': 'console__command-list-item--warning'
    };

    this.promptElem = document.getElementById('command-prompt');
    this.listElem = document.getElementById('commands');

    this.consoleElem = document.getElementById('console-selector');
    this.commandInput = document.getElementById('command-input');

    this.consoleElem.addEventListener('click', function () {
      _this.commandInput.focus();
    });

    this.promptElem.addEventListener('submit', function (e) {
      e.preventDefault();
      var command = e.target.prompt.value;
      e.target.prompt.value = '';
      _controller2.default.enterCommand(command);
    });
    this.render();
  },
  render: function render() {
    var _this2 = this;

    this.listElem.innerHTML = '';
    var commands = _controller2.default.getPreviousCommands();

    this.consoleElem.scrollTop = this.consoleElem.scrollHeight;

    if (_controller2.default.getEnteredCommands()) {
      this.commandInput.value = _controller2.default.getEnteredCommands().text;
    } else {
      this.commandInput.value = '';
    }

    commands.forEach(function (command, i) {
      var li = (0, _dom.element)('li', { className: 'console__command-list-item ' + _this2.classMap[command.type] }, command.type === 'command' ? '$ ' + command.text : command.text);

      _this2.listElem.appendChild(li);
    });
  }
};

exports.default = consoleView;

},{"../controller":2,"../utils/dom":4,"../utils/events":5}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('../controller');

var _controller2 = _interopRequireDefault(_controller);

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_events2.default.on('viewInit', function (data) {
  view.init();
});

var view = {
  init: function init() {
    this.dateElem = document.getElementById('date');
    this.dateElem.innerHTML = _controller2.default.getDate();
  }
};

exports.default = view;

},{"../controller":2,"../utils/events":5}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('../controller');

var _controller2 = _interopRequireDefault(_controller);

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _filters = require('../utils/filters');

var _filters2 = _interopRequireDefault(_filters);

var _helpers = require('../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_events2.default.on('resumeContentViewInit', function (data) {
  resumeContentView.init();
});
_events2.default.on('resumeContentViewRender', function (data) {
  resumeContentView.render();
});

var resumeContentView = {
  init: function init() {
    this.resumeContainerElem = document.getElementById('resume-code');
    this.fileNameElem = document.getElementById('file-name');
    this.render();
  },
  format: function format(data) {
    return (0, _helpers.compose)(function (d) {
      return JSON.stringify(d, null, '   ');
    }, _filters2.default.textToJSON, _filters2.default.findUrls)(data);
  },
  render: function render() {
    var data = _controller2.default.getCurrentOutput();

    var json = this.format(data);

    this.resumeContainerElem.innerHTML = json;
    this.fileNameElem.textContent = _controller2.default.getFileName();
  }
};

exports.default = resumeContentView;

},{"../controller":2,"../utils/events":5,"../utils/filters":6,"../utils/helpers":7}]},{},[1]);
