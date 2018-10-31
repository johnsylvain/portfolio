import { ConsoleListItem } from '../models/console-list-item';

function createCommands(state) {
  function help() {
    return {
      currentOutput: state.currentOutput,
      newCommandList: [
        new ConsoleListItem('Available commands:', 'bold')
      ].concat(
        state.commands
          .map(availableCommand => {
            if (!availableCommand.ignored) {
              return new ConsoleListItem(
                availableCommand.params !== null
                  ? `- ${
                      availableCommand.text
                    } <${availableCommand.params.toLocaleString()}>`
                  : `- ${availableCommand.text}`
              );
            }
          })
          .filter(Boolean)
      )
    };
  }

  function open(section) {
    return {
      currentOutput: { resume: state.data },
      newCommandList: []
    };
  }

  function exit() {
    window.location.hash = '/';
    return {
      currentOutput: state.currentOutput,
      newCommandList: []
    };
  }

  function show(section) {
    return {
      currentOutput: { [section]: state.data[section] },
      newCommandList: []
    };
  }

  return {
    help,
    open,
    exit,
    show
  };
}

export default function reducer(action, state) {
  switch (action.type) {
    case 'setInteractiveMode': {
      return Object.assign({}, state, { interactiveMode: action.payload });
    }

    case 'enterCommand': {
      const [keyword, argument] = action.payload.trim().split(' ');
      const commands = createCommands(state);

      if (!state.commands.some(command => command.text === keyword)) {
        responses.push(
          new ConsoleListItem(`'${keyword}' is not a command`, 'error')
        );
      }

      const { currentOutput, newCommandList } = commands[keyword](argument);

      return Object.assign({}, state, {
        currentOutput,
        commandList: state.commandList
          .concat([new ConsoleListItem(action.payload, 'command')])
          .concat(newCommandList)
      });
    }
  }
}