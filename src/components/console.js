import { Component, h } from '../lib';

const get = (() => {
  const cache = {};

  return selector => {
    if (!cache[selector]) {
      cache[selector] = document.querySelector(selector);
    }

    return cache[selector];
  };
})();

export class Console extends Component {
  constructor(props) {
    super(props);
  }

  focusInput = () => {
    get('#command-input').focus();
  };

  scrollToBottom = () => {
    const listEl = get('.console__command-list');
    const consoleEl = get('.console');
    consoleEl.scrollTo({ top: listEl.clientHeight + 40 });
  };

  render() {
    return (
      <div className="console" onClick={this.focusInput}>
        <ul className="console__command-list">
          {this.props.commandList.map(command => (
            <li className={`console__item console__item--${command.type}`}>
              {command.text}
            </li>
          ))}
        </ul>
        <form onSubmit={this.props.onEnterCommand}>
          <span>$&nbsp;</span>
          <input
            type="text"
            onKeyup={event => {
              this.scrollToBottom();
              this.props.onInputKeypress(event);
            }}
            name="prompt"
            id="command-input"
            className="console__prompt"
            autocomplete="off"
          />
        </form>
      </div>
    );
  }
}
