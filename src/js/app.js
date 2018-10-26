import Router from './utils/router';
import events from './utils/events';
import { throttle } from './utils/helpers';
import { render } from './utils/vdom';

import actions from './actions';
import resumeView from './views/resume';
import consoleView from './views/console';

class App {
  constructor() {
    this.breakpoint = 768;
    this.interactiveMode = false;
    this.elements = {
      nav: Array.from(document.querySelector('.nav').children),
      date: document.querySelector('.date')
    };
    this.router = undefined;

    this.bindEvents();
    this.bindRoutes();

    events.emit('console.render');
    events.emit('resume.render');

    this.elements.date.textContent = new Date().getFullYear().toString();
  }

  bindRoutes() {
    this.router = new Router({
      '/': () => {
        this.switchModes({ interactive: true });
      },
      '/resume': () => {
        this.switchModes({ interactive: false });
        if (window.innerWidth <= this.breakpoint) {
          this.router.go('#/');
        }
      }
    });

    this.router.onRouteChange(path => {
      this.elements.nav.forEach(a => a.classList.remove('active'));

      this.elements.nav
        .find(a => a.getAttribute('href') === `#${path}`)
        .classList.add('active');
    });
  }

  bindEvents() {
    window.addEventListener(
      'resize',
      throttle(() => {
        if (window.innerWidth <= this.breakpoint) {
          this.router.go('#/');
        }
      }, 250)
    );

    window.addEventListener('keyup', e => {
      const keyPress = actions
        .getKeyCommands()
        .find(
          key =>
            key.shortcut
              ? key.code === e.which && e[key.shortcut]
              : key.code === e.which
        );

      if (keyPress && document.activeElement.id === 'command-input')
        actions.executeKeypress(keyPress.action);
    });

    document.querySelector('#console-selector').addEventListener('click', e => {
      document.querySelector('#command-input').focus();
    });

    events.on('console.render', () => {
      render(consoleView.render(), document.querySelector('#console-selector'));
      document.querySelector('#command-input').focus();
    });

    events.on('resume.render', () => {
      render(resumeView.render(), document.querySelector('#resume-selector'));
    });
  }

  switchModes({ interactive }) {
    const targets = [
      document.querySelector('.wrap'),
      document.querySelector('#resume-selector'),
      document.querySelector('#console-selector')
    ];

    if (interactive) {
      targets.forEach(t => t.classList.remove('interactive-mode'));
      this.interactiveMode = false;
    } else {
      targets.forEach(t => t.classList.toggle('interactive-mode'));
      this.interactiveMode = !this.interactiveMode;
    }
  }
}

new App();
