import { Command } from '../models/command';
import { Commands } from '../models/commands';

export default function reducer(action, state) {
  switch (action.type) {
    case 'setInteractiveMode': {
      return Object.assign({}, state, { interactiveMode: action.payload });
    }

    case 'enterCommand': {
      const [keyword, argument] = action.payload.trim().split(' ');
      const commands = new Commands(state);
      const responses = [];

      const {
        commandText,
        commandParam,
        expectedParamCount,
        acceptedParams
      } = Command.matchCommand(state.commands, keyword, argument);

      if (typeof commandText === 'undefined') {
        responses.push(
          new Command(`'${keyword}' is not a command`, 'error'),
          new Command("type 'help' to list all commands")
        );
      }

      if (typeof commandParam === 'undefined' && expectedParamCount > 0) {
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

      const {
        currentOutput = state.currentOutput,
        newCommandList = []
      } = commands[keyword] ? commands[keyword](argument) : {};

      return Object.assign({}, state, {
        currentOutput,
        commandList: state.commandList
          .concat([new Command(action.payload, 'command')])
          .concat(responses)
          .concat(newCommandList)
      });
    }
  }
}
