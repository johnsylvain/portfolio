import { Command } from '../models/command';
import { Commands } from '../models/commands';

export default function reducer(action, state) {
  switch (action.type) {
    case 'setInteractiveMode': {
      return { ...state, interactiveMode: action.payload };
    }

    case 'executeKeypress': {
      const { pointer, data } = state.enteredCommands;
      const newPointer = {
        UP: pointer < data.length ? pointer + 1 : pointer,
        DOWN: pointer > 0 ? pointer - 1 : pointer
      }[action.payload];

      return {
        ...state,
        enteredCommands: {
          ...state.enteredCommands,
          pointer: newPointer,
          currentCommand: data[data.length - newPointer]
        }
      };
    }

    case 'enterCommand': {
      const [keyword, argument] = action.payload.trim().split(' ');
      const commands = new Commands(state);
      const responses = [];
      const {
        enteredCommands: { data }
      } = state;
      const { command, expectedParamCount, acceptedParams } = Command.match(
        state.commands,
        keyword,
        argument
      );
      const {
        currentOutput = state.currentOutput,
        newCommandList = []
      } = commands[keyword] ? commands[keyword](argument) : {};

      if (typeof command.text === 'undefined') {
        responses.push(
          new Command(`'${keyword}' is not a command`, 'error'),
          new Command("type 'help' to list all commands")
        );
      }

      if (typeof command.param === 'undefined' && expectedParamCount > 0) {
        if (!argument) {
          responses.push(
            new Command(`please secify an argument for'${keyword}'`, 'warning')
          );
        } else {
          responses.push(
            new Command(
              `'${argument}' is not an argument for '${keyword}'`,
              'error'
            )
          );
        }

        responses.push(new Command(`Arguments for '${keyword}':`, 'bold'));
        acceptedParams.forEach(param => {
          responses.push(new Command(`- ${param}`));
        });
      }

      return {
        ...state,
        currentOutput,
        commandList: state.commandList
          .concat([new Command(action.payload, 'command')])
          .concat(responses)
          .concat(newCommandList),
        enteredCommands: {
          ...state.enteredCommands,
          data:
            (data[data.length - 1] || {}).text === action.payload
              ? data
              : data.concat(new Command(action.payload)),
          pointer: 0,
          currentCommand: ''
        }
      };
    }
  }
}
