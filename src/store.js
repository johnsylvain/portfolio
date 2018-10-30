import { ConsoleListItem } from './models/console-list-item';

export class Store {
  constructor(state) {
    this.state = {};
    this.onChanges = [];

    this.setState(state);
  }

  subscribe(fn) {
    this.onChanges.push(fn);
  }

  getCommand(text) {
    return this.state.commands.find(c => c.text === text);
  }

  setState(newState) {
    Object.assign(this.state, newState);
    this.onChanges.forEach(fn => fn.call(undefined));
  }

  pushCommand(newCommand) {
    this.setState({
      commandList: this.state.commandList.concat(newCommand)
    });
  }

  executeKeypress(key) {
    const { pointer } = this.state.enteredCommands;
    const keyActions = {
      UP:
        pointer < this.state.enteredCommands.data.length
          ? pointer + 1
          : pointer,
      DOWN: pointer > 0 ? pointer - 1 : pointer
    };
    const newPointer = keyActions[key];

    this.setState({
      enteredCommands: Object.assign({}, this.state.enteredCommands, {
        pointer: newPointer,
        currentCommand: this.state.enteredCommands.data[
          this.state.enteredCommands.data.length - newPointer
        ]
      })
    });
  }

  enterCommand(command) {
    command = command.trim();

    const args = command.split(' ');
    const newCommand = new ConsoleListItem(command, 'command');
    const lastCommand = this.state.enteredCommands.data[
      this.state.enteredCommands.data.length - 1
    ];
    const flag = this.state.commands.find(o => o.text === args[0]);

    this.pushCommand(newCommand);

    if (args[0] !== '' && (!lastCommand || command !== lastCommand.text)) {
      this.state.enteredCommands.data.push(newCommand);
    }

    this.setState({
      enteredCommands: Object.assign({}, this.state.enteredCommands, {
        pointer: 0,
        currentCommand: ''
      })
    });

    if (!flag) {
      this.pushCommand([
        new ConsoleListItem('command not found: ' + args[0], 'error'),
        new ConsoleListItem('to view available commands type: help')
      ]);
    } else {
      this.executeCommand(command);
    }
  }

  executeCommand(command) {
    const self = this;
    command = command.split(' ');

    const verifyArguments = (expected, name) => {
      expected = expected || 0;
      if (command.length - 1 !== expected) {
        this.pushCommand(
          new ConsoleListItem(`'${name}' does not need any arguments`, 'error')
        );
        return;
      }
    };

    const commands = {
      pwd() {
        verifyArguments(self.getCommand('pwd').params, 'pwd');

        self.pushCommand(new ConsoleListItem(window.location.host));
      },

      ls() {
        verifyArguments(self.getCommand('ls').params, 'ls');

        self.pushCommand([
          new ConsoleListItem('index.html'),
          new ConsoleListItem('app.js'),
          new ConsoleListItem('style.css')
        ]);
      },

      clear() {
        verifyArguments(self.getCommand('clear').params, 'clear');

        self.setState({
          commandList: [new ConsoleListItem('')]
        });
      },

      exit() {
        window.location.hash = '';
      },

      help() {
        verifyArguments(self.getCommand('help').params, 'help');

        self.pushCommand(new ConsoleListItem('Available Commands:', 'bold'));

        self.state.commands.forEach(availableCommand => {
          if (!availableCommand.ignored) {
            self.pushCommand(
              new ConsoleListItem(
                availableCommand.params !== null
                  ? `- ${
                      availableCommand.text
                    } <${availableCommand.params.toLocaleString()}>`
                  : `- ${availableCommand.text}`,
                'response'
              )
            );
          }
        });
      },

      open() {
        if (command.length === 1) {
          self.pushCommand(
            new ConsoleListItem(
              `type 'open <${self.getCommand('open').params}>'`,
              'warning'
            )
          );
        } else {
          return {
            resume: () => {
              self.setState({
                currentOutput: {
                  resume: self.state.data
                }
              });
            }
          };
        }
      },

      show() {
        const showSection = section => () => {
          self.setState({
            currentOutput: {
              [section]: self.state.data[section]
            }
          });
        };

        if (command.length === 1) {
          self.pushCommand(
            new ConsoleListItem(
              `type 'show <${self.getCommand('show').params}>'`,
              'warning'
            )
          );
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
          window.open(self.state.data.contact.social[site]);
        };

        if (command.length === 1) {
          self.pushCommand(
            new ConsoleListItem(
              `type 'social <${self.getCommand('social').params}>'`,
              'warning'
            )
          );
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
          self.pushCommand(
            new ConsoleListItem(`please specify a path`, 'warning')
          );
        } else {
          return {
            '-rf': rf
          };
        }
      }
    };

    if (command[0] && command.length === 1) {
      commands[command[0]]();
    } else if (command.length > 1) {
      const subCommand = commands[command[0]]();
      if (subCommand[command[1]]) {
        subCommand[command[1]]();
      } else {
        this.pushCommand(
          new ConsoleListItem(
            command[1] + " is not a proper parameter of '" + command[0] + "'",
            'error'
          )
        );
      }
    }
  }
}
