import { h } from '../lib/vdom';

export default function Console({
  commandList,
  onEnterCommand,
  onInputKeypress
}) {
  const handleClick = () => {
    document.querySelector('#command-input').focus();
  };

  return (
    <div className="console" onClick={handleClick}>
      <ul className="console__command-list">
        {commandList.map(command => (
          <li className={`console__item console__item--${command.type}`}>
            {command.text}
          </li>
        ))}
      </ul>
      <form onSubmit={onEnterCommand}>
        <span>$&nbsp;</span>
        <input
          onKeyup={onInputKeypress}
          type="text"
          name="prompt"
          id="command-input"
          className="console__prompt"
          autocomplete="off"
        />
      </form>
    </div>
  );
}
