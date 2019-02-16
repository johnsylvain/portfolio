import { Component, h } from '../lib';

export class Console extends Component {
  constructor(props) {
    super(props);
  }

  focusInput = () => {
    document.querySelector('#command-input').focus();
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
            onKeyup={this.props.onInputKeypress}
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
