import { Command } from './models/command';
import { Commands } from './models/commands';
import resumeJson from './assets/resume.json';

let commandCache;
const initialState = {
  interactiveMode: false,
  keyCommands: [{ code: 38, action: 'UP' }, { code: 40, action: 'DOWN' }],
  commandList: [new Command("type 'help' to view commands")],
  enteredCommands: {
    data: [],
    currentCommand: '',
    pointer: 0
  },
  currentOutput: [
    "to view my resume, type 'open resume' in the terminal to the left",
    "type 'help' to view other commands"
  ],
  commands: [
    { text: '', description: '', params: null, ignored: true },
    { text: 'help', description: '', params: null },
    { text: 'clear', description: '', params: null, ignored: true },
    { text: 'pwd', description: '', params: null, ignored: true },
    { text: 'ls', description: '', params: null, ignored: true },
    { text: 'cd', description: '', params: null, ignored: true },
    { text: 'open', description: 'file', params: ['resume'] },
    {
      text: 'show',
      description: 'section',
      params: ['education', 'skills', 'experience', 'projects']
    },
    {
      text: 'social',
      description: 'profile',
      params: ['github', 'linkedin']
    },
    { text: 'rm', description: '', params: ['-rf'], ignored: true }
  ],
  data: resumeJson.resume
};

function createCommands(state) {
  if (commandCache) return commandCache;
  return (commandCache = new Commands(state));
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_INTERACTIVE_MODE': {
      return { ...state, interactiveMode: action.payload };
    }

    case 'EXECUTE_KEYPRESS': {
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

    case 'ENTER_COMMAND': {
      const [keyword, argument] = action.payload.trim().split(' ');
      const commands = createCommands(state);
      const responses = [];
      const {
        enteredCommands: { data }
      } = state;
      const { command, expectedParamCount, acceptedParams } = Commands.match(
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
          responses.push(new Command(`  ${param}`));
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

    default:
      return state;
  }
}