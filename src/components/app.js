import { Component } from '../lib/component';
import { throttle } from '../lib/utils';
import { h } from '../lib/vdom';
import { Resume } from './resume';
import { Console } from './console';
import { EXECUTE_KEYPRESS, ENTER_COMMAND } from '../constants/actions';

export class App extends Component {
  constructor(props) {
    super(props);

    this.props.router.subscribe(path => {
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
        this.props.router.go(event.target.attributes['data-to'].value);
      }
    });

    window.addEventListener(
      'resize',
      throttle(() => {
        if (window.innerWidth <= 768) {
          this.props.router.go('/');
        }
      }, 250)
    );
  }

  handleConsoleSubmit = event => {
    event.preventDefault();

    this.props.store.dispatch({
      type: ENTER_COMMAND,
      payload: event.target.prompt.value
    });

    event.target.prompt.value = '';
  };

  handleConsoleKeypress = event => {
    const keyPress = this.props.store.state.keyCommands.find(
      key => key.code === event.which
    );

    if (keyPress && document.activeElement.id === 'command-input') {
      this.props.store.dispatch({
        type: EXECUTE_KEYPRESS,
        payload: keyPress.action
      });
      event.target.value =
        (this.props.store.state.enteredCommands.currentCommand || {}).text ||
        '';
    }
  };

  render() {
    return (
      <div>
        <div
          className={`console-selector ${
            this.props.store.state.interactiveMode ? 'interactive-mode' : ''
            }`}
        >
          <Console
            commandList={this.props.store.state.commandList}
            onEnterCommand={this.handleConsoleSubmit}
            onInputKeypress={this.handleConsoleKeypress}
          />
        </div>
        <div className="resume-selector item item--inverse show-interactive">
          <Resume output={this.props.store.state.currentOutput} />
        </div>
      </div>
    );
  }
}
