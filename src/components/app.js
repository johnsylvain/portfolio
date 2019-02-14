import Router from '../lib/router';
import { throttle } from '../lib/utils';
import { h } from '../lib/vdom';
import Resume from './resume';
import Console from './console';

const BREAKPOINT = 768;

export default class App {
  static type = 'CLASS_COMPONENT';

  constructor({ store }) {
    this.store = store;
    this.handleConsoleSubmit = this.handleConsoleSubmit.bind(this);
    this.handleConsoleKeypress = this.handleConsoleKeypress.bind(this);
    this.router = new Router({
      '/': () => {
        this.store.dispatch({ type: 'SET_INTERACTIVE_MODE', payload: false });
        document.querySelector('.wrap').classList.remove('interactive-mode');
      },
      '/resume': () => {
        this.store.dispatch({ type: 'SET_INTERACTIVE_MODE', payload: true });
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
      type: 'ENTER_COMMAND',
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
        type: 'EXECUTE_KEYPRESS',
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
