import actions from '../actions';
import { h } from '../utils/vdom';

export default {
  handleSubmit(e) {
    e.preventDefault();
    actions.enterCommand(e.target.prompt.value);
    e.target.prompt.value = '';
  },

  render() {
    return (
      <div className="console">
        <ul className="console__command-list">
          {actions
            .getCommandList()
            .map(command => (
              <li className={`console__item console__item--${command.type}`}>
                {command.type === 'command'
                  ? `$ ${command.text}`
                  : command.text}
              </li>
            ))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <span>$&nbsp;</span>
          <input
            type="text"
            name="prompt"
            id="command-input"
            className="console__prompt"
            autocomplete="off"
            value={actions.getEnteredCommands().text}
          />
        </form>
      </div>
    );
  }
};
