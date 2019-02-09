import Router from './lib/router';
import { throttle } from './lib/utils';
import { render, h } from './lib/vdom';

import store from './store/index.js';
import Resume from './components/resume';
import Console from './components/console';

const BREAKPOINT = 768;

class App {
  constructor({ store }) {
    this.store = store;
    this.handleConsoleSubmit = this.handleConsoleSubmit.bind(this);
    this.handleConsoleKeypress = this.handleConsoleKeypress.bind(this);
    this.router = new Router({
      '/': () => {
        this.store.dispatch({ type: 'setInteractiveMode', payload: false });
        document.querySelector('.wrap').classList.remove('interactive-mode');
      },
      '/resume': () => {
        this.store.dispatch({ type: 'setInteractiveMode', payload: true });
        document.querySelector('.wrap').classList.add('interactive-mode');
        if (window.innerWidth <= BREAKPOINT) {
          this.router.go('/');
        }
      }
    });

    this.router.subscribe(path => {
      const navButtons = Array.from(document.querySelector('.nav').children);
      navButtons.forEach(a => a.classList.remove('active'));

      navButtons
        .find(a => a.attributes['data-to'].value === path)
        .classList.add('active');
    });

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('click', event => {
      if (event.target.attributes['data-to']) {
        this.router.go(event.target.attributes['data-to'].value);
      }
    });

    window.addEventListener(
      'resize',
      throttle(() => {
        if (window.innerWidth <= BREAKPOINT) {
          this.router.go('/');
        }
      }, 250)
    );
  }

  handleConsoleSubmit(event) {
    event.preventDefault();
    this.store.dispatch({
      type: 'enterCommand',
      payload: event.target.prompt.value
    });
    event.target.prompt.value = '';
  }

  handleConsoleKeypress(event) {
    const keyPress = this.store.state.keyCommands.find(
      key => key.code === event.which
    );

    if (keyPress && document.activeElement.id === 'command-input') {
      this.store.dispatch({
        type: 'executeKeypress',
        payload: keyPress.action
      });
      event.target.value =
        (this.store.state.enteredCommands.currentCommand || {}).text || '';
    }
  }

  render() {
    return (
      <div>
        <div
          className={`console-selector ${
            this.store.state.interactiveMode ? 'interactive-mode' : ''
            }`}
        >
          <Console
            commandList={this.store.state.commandList}
            onEnterCommand={this.handleConsoleSubmit}
            onInputKeypress={this.handleConsoleKeypress}
          />
        </div>
        <div className="resume-selector item item--inverse show-interactive">
          <Resume output={this.store.state.currentOutput} />
        </div>
      </div>
    );
  }
}

const appInstance = new App({ store });

store.subscribe(() => {
  render(appInstance.render(), document.querySelector('#app-selector'));
});
