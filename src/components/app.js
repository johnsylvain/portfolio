import { h } from '../utils/vdom';
import Resume from './resume';
import Console from './console';

export default function App({ store }) {
  return (
    <div>
      <div
        className={`console-selector ${
          store.state.interactiveMode ? 'interactive-mode' : ''
        }`}
      >
        <Console
          commandList={store.state.commandList}
          onEnterCommand={store.enterCommand.bind(store)}
          promptValue={
            store.state.enteredCommands.currentCommand || { text: '' }
          }
        />
      </div>
      <div className="resume-selector item item--inverse show-interactive">
        <Resume output={store.state.currentOutput} />
      </div>
    </div>
  );
}
