import { h } from '../utils/vdom';

export default function Console({ commandList, onEnterCommand, promptValue }) {
  const handleSubmit = e => {
    e.preventDefault();
    onEnterCommand(e.target.prompt.value);
    e.target.prompt.value = '';
  };

  const handleClick = e => {
    e.target.lastChild.prompt.focus();
  };

  return (
    <div className="console" onClick={handleClick}>
      <ul className="console__command-list">
        {commandList.map(command => (
          <li className={`console__item console__item--${command.type}`}>
            {command.type === 'command' ? `$ ${command.text}` : command.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <span>$&nbsp;</span>
        <input
          type="text"
          name="prompt"
          id="command-input"
          className="console__prompt"
          autocomplete="off"
          value={promptValue.text}
        />
      </form>
    </div>
  );
}
