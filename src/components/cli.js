import { Component, h } from '../lib';
import { Output } from './output';
import { Console } from './console';
import { Link } from './link';
import { EXECUTE_KEYPRESS, ENTER_COMMAND } from '../constants/actions';

export class CLI extends Component {
  constructor(props) {
    super(props);
  }

  handleConsoleSubmit = event => {
    event.preventDefault();

    this.props.store.dispatch({
      type: ENTER_COMMAND,
      payload: event.target.prompt.value.trim()
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
      <div
        className={`app-selector ${
          this.props.store.state.interactiveMode ? 'interactive-mode' : ''
        }`}
      >
        <div className="app-selector__header">
          <Link to="/">
            <span>👈</span> Projects
          </Link>
        </div>
        <div className="app-selector__content">
          <Console
            commandList={this.props.store.state.commandList}
            onEnterCommand={this.handleConsoleSubmit}
            onInputKeypress={this.handleConsoleKeypress}
          />
          <Output output={this.props.store.state.currentOutput} />
        </div>
      </div>
    );
  }
}
