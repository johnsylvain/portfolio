import Router from './utils/router.js';
import events from './utils/events';
import { throttle } from './utils/helpers';
import { render } from './utils/vdom';

import actions from './actions';
import resumeView from './views/resume';
import consoleView from './views/console';

import '../styles/style.scss';

const app = {
  breakpoint: 768,
  interactiveMode: false,
  router: undefined,

  init() {
    this.bindEvents();
    this.bindRoutes();

    events.emit('console.render');
    events.emit('resume.render');

    document.querySelector(
      '.date'
    ).textContent = new Date().getFullYear().toString();

    document.querySelectorAll('.item').forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('fade-up');
      }, i * 70);

      item.addEventListener('animationend', () => {
        item.style.opacity = 1;
        item.classList.remove('fade-up');
      });
    });
  },

  bindRoutes() {
    this.router = new Router({
      '/': () => {
        this.switchModes({ interactive: true });
        setActiveNavButton('#/');
      },
      '/resume': () => {
        this.switchModes({ interactive: false });
        setActiveNavButton('#/resume');
        if (window.innerWidth <= this.breakpoint) {
          this.router.go('#/');
        }
      }
    });

    function setActiveNavButton(path) {
      const children = Array.from(document.querySelector('.nav').children);

      children.forEach(a => a.classList.remove('active'));

      children
        .find(a => a.getAttribute('href') === path)
        .classList.add('active');
    }
  },

  bindEvents() {
    const $console = document.querySelector('.console');

    window.addEventListener(
      'resize',
      throttle(
        event => {
          if (window.innerWidth <= this.breakpoint) {
            this.router.go('#/');
          }
        },
        250,
        this
      )
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
  },

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
};

app.init();
