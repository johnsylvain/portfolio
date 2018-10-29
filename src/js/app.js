import Router from './utils/router';
import Utils from './utils/helpers';
import { render, h } from './utils/vdom';

import Store from './store';
import state from './state';

import Resume from './views/resume';
import Console from './views/console';

class App {
  constructor() {
    this.breakpoint = 768;
    this.interactiveMode = false;
    this.elements = {
      nav: Array.from(document.querySelector('.nav').children),
      date: document.querySelector('.date')
    };
    this.router = undefined;
    this.store = new Store(state);

    this.bindEvents();
    this.bindRoutes();

    this.store.inform();

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

    this.router.subscribe(path => {
      this.elements.nav.forEach(a => a.classList.remove('active'));

      this.elements.nav
        .find(a => a.getAttribute('href') === `#${path}`)
        .classList.add('active');
    });
  }

  bindEvents() {
    window.addEventListener(
      'resize',
      Utils.throttle(() => {
        if (window.innerWidth <= this.breakpoint) {
          this.router.go('#/');
        }
      }, 250)
    );

    window.addEventListener('keyup', e => {
      const keyPress = this.store.state.keyCommands.find(
        key => key.code === e.which
      );

      if (keyPress && document.activeElement.id === 'command-input') {
        this.store.executeKeypress(keyPress.action);
      }
    });

    this.store.subscribe(() => {
      render(
        <Resume output={this.store.state.currentOutput} />,
        document.querySelector('#resume-selector')
      );

      render(
        <Console
          commandList={this.store.state.commandList}
          onEnterCommand={this.store.enterCommand.bind(this.store)}
          previousCommand={
            this.store.state.enteredCommands.currentCommand || { text: '' }
          }
        />,
        document.querySelector('#console-selector')
      );

      document.querySelector('#command-input').focus();
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
