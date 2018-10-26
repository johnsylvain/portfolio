import events from '../utils/events';
import state from '../state';

const actions = {
  getCurrentOutput: () => state.currentOutput,
  getKeyCommands: () => state.keyCommands,
  getCommand: text => state.commands.find(c => c.text === text),
  getCommandList: () => state.commandList,
  getEnteredCommands: () =>
    state.enteredCommands.currentCommand
      ? state.enteredCommands.currentCommand
      : { text: '' },

  updateOutput(newOutput) {
    state.currentOutput = newOutput;
  },

  executeKeypress(key) {
    switch (key) {
      case 'UP': {
        if (state.enteredCommands.pointer < state.enteredCommands.data.length)
          state.enteredCommands.pointer++;

        const pos =
          state.enteredCommands.data.length - state.enteredCommands.pointer;
        state.enteredCommands.currentCommand = state.enteredCommands.data[pos];
        break;
      }
      case 'DOWN': {
        if (state.enteredCommands.pointer > 0) state.enteredCommands.pointer--;

        const pos =
          state.enteredCommands.data.length - state.enteredCommands.pointer;
        state.enteredCommands.currentCommand = state.enteredCommands.data[pos];
        break;
      }
      case 'CLEAR':
        this.executeCommand('clear');
        break;
    }

    events.emit('console.render');
  },

  enterCommand(command) {
    command = command.trim();

    const args = command.split(' ');
    const newCommand = { text: command, type: 'command' };
    const lastCommand =
      state.enteredCommands.data[state.enteredCommands.data.length - 1];
    const flag = state.commands.find(o => o.text === args[0]);

    state.commandList.push(newCommand);

    if (args[0] !== '' && (!lastCommand || command !== lastCommand.text))
      state.enteredCommands.data.push(newCommand);

    state.enteredCommands.pointer = 0;

    if (!flag) {
      state.commandList.push(
        { text: 'command not found: ' + args[0], type: 'error' },
        { text: 'to view available commands type: help', type: 'response' }
      );
      events.emit('console.render');
    } else {
      this.executeCommand(command);
    }
  },

  executeCommand(command) {
    const self = this;
    command = command.split(' ');

    const verifyArguments = (expected, name) => {
      if (command.length - 1 !== expected) {
        state.commandList.push({
          text: `'${name}' does not need any arguments`,
          type: 'error'
        });
        return;
      }
    };

    const commands = {
      pwd() {
        verifyArguments(actions.getCommand('pwd').params || 0, 'pwd');

        state.commandList.push({
          text: window.location.host,
          type: 'bold'
        });
      },

      ls() {
        verifyArguments(actions.getCommand('ls').params || 0, 'ls');

        state.commandList.push(
          { text: 'index.html', type: 'response' },
          { text: 'app.js', type: 'response' },
          { text: 'style.css', type: 'response' }
        );
      },

      clear() {
        verifyArguments(actions.getCommand('clear').params || 0, 'clear');

        state.commandList = [];
      },

      help() {
        verifyArguments(actions.getCommand('help').params || 0, 'help');

        state.commandList.push({
          text: 'Available Commands:',
          type: 'bold'
        });

        state.commands.forEach(availableCommand => {
          if (!availableCommand.ignored) {
            state.commandList.push({
              text:
                availableCommand.params !== null
                  ? `- ${
                      availableCommand.text
                    } <${availableCommand.params.toLocaleString()}>`
                  : `- ${availableCommand.text}`,
              type: 'response'
            });
          }
        });
      },

      open() {
        if (command.length === 1) {
          state.commandList.push({
            text: `type 'open [${actions.getCommand('open').params}]'`,
            type: 'warning'
          });
        } else {
          return {
            resume: () => {
              self.updateOutput({ resume: state.data });
            }
          };
        }
      },

      show() {
        const showSection = section => () => {
          self.updateOutput({
            [section]: state.data[section]
          });
        };

        if (command.length === 1) {
          state.commandList.push({
            text: `type 'show [${actions.getCommand('show').params}]'`,
            type: 'warning'
          });
        } else {
          return {
            education: showSection('education'),
            skills: showSection('skills'),
            xp: showSection('experience'),
            projects: showSection('projects')
          };
        }
      },

      social() {
        const openLink = site => () => {
          window.open(state.data.contact.social[site]);
        };

        if (command.length === 1) {
          state.commandList.push({
            text: `type 'social [${actions.getCommand('social').params}]'`,
            type: 'warning'
          });
        } else {
          return {
            github: openLink('github'),
            linkedin: openLink('linkedin')
          };
        }
      },

      rm() {
        const rf = () => {
          const commandInputElement = document.querySelector('#command-input');
          commandInputElement.disabled = true;

          toggleClass('add');

          window.setTimeout(() => {
            commandInputElement.disabled = false;
            toggleClass('remove');
            commandInputElement.focus();
          }, 4000);

          function toggleClass(type) {
            [
              document.querySelector('.wrap'),
              document.querySelectorAll('.trash')
            ].forEach(el => {
              if (Array.from(el)[0]) {
                el.forEach(e => {
                  e.classList[type]('crash');
                });
              } else {
                el.classList[type]('crash');
              }
            });
          }
        };

        if (command.length === 1) {
          state.commandList.push({
            text: `please specify a path`,
            type: 'warning'
          });
        } else {
          return {
            '-rf': rf
          };
        }
      }
    };

    state.enteredCommands.pointer = 0;
    state.enteredCommands.currentCommand = '';

    if (command[0] && command.length === 1) {
      commands[command[0]]();
    } else if (command.length > 1) {
      const subCommand = commands[command[0]]();
      if (subCommand[command[1]]) {
        subCommand[command[1]]();
      } else {
        state.commandList.push({
          text:
            command[1] + " is not a proper parameter of '" + command[0] + "'",
          type: 'error'
        });
      }
    }
    events.emit('resume.render');
    events.emit('console.render');
  }
};

export default actions;
