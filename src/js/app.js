import Router from './utils/router';
import events from './utils/events';
import throttle from './utils/throttle';

import controller from './controller';
import resumeContentView from './views/resumeContentView';
import consoleView from './views/consoleView';
import view from './views/mainView';

var app = {
  pageWidth: window.innerWidth,
  breakpoint: 768,
  interactiveMode: false,

  init() {
    controller.init();

    let routes = [
      {
        path: '/',
        controller: function() {
          events.emit('switchModes', {flag: true});
        }
      },
      {
        path: '/resume',
        controller: () => {
          events.emit('switchModes', {flag: false});
          if(window.innerWidth <= this.breakpoint) {
            router.go({route: '#/'});
          }
        }
      }
    ]
    let router = new Router(routes);

    window.addEventListener('keyup', this.handleKeypress.bind(this));

    Array.from(document.getElementsByClassName('toggle-btn')).forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        router.go({route: e.target.href});
      });
    });

    window.addEventListener('resize', throttle((event) => {
      if(window.innerWidth <= this.breakpoint) {
        router.go({route: '#/'});
      }
    }, 250, this));

    events.on('switchModes', data => {
      this.switchModes(data.flag);
    })

  },
  handleKeypress(e) {
    let availableKeys = controller.getKeyCommands();
    let keyPress = availableKeys.filter(key => {
      if(key.shortcut){
        return key.code === e.which && e[key.shortcut];
      } else if (!key.shourcut){
        return key.code === e.which;
      }
    })[0]

    if(keyPress) { controller.executeKeypress(keyPress.action); }
  },

  switchModes(flag) {
    const btn = document.getElementById('toggle-interactive');

    var targets = [
      document.getElementById('page-wrap'),
      document.getElementById('landing-wrapper'),
      document.getElementById('resume-wrapper'),
      document.getElementById('console-wrapper'),
      document.getElementById('container'),
      document.getElementById('toggle-interactive')
    ];

    if (flag){
      targets.forEach(t => {
        t.classList.remove('interactiveMode');
        t.classList.add('nonInteractiveMode');
      });
      this.interactiveMode = false;
      btn.setAttribute('href', '#/resume');
      btn.setAttribute('data-tooltip', 'CLI Resume');
      return;
    }
    if (!this.interactiveMode) {
      targets.forEach(t => {
        t.classList.add('interactiveMode');
        t.classList.remove('nonInteractiveMode');
      })
      btn.setAttribute('href', '#/');
      btn.setAttribute('data-tooltip', 'Close CLI Resume');
    } else {
      targets.forEach(t => {
        t.classList.remove('interactiveMode');
        t.classList.add('nonInteractiveMode');
      })
      btn.setAttribute('href', '#/resume');

    }
    this.interactiveMode = !this.interactiveMode;
  }
};

app.init();
