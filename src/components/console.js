import { h } from '../lib/vdom';

const handleClick = () => {
  document.querySelector('#command-input').focus();
};

export default function Console({
  commandList,
  onEnterCommand,
  onInputKeypress
}) {
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
