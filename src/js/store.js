export class Store {
  constructor(state, subscription) {
    this.state = {};
    this.subscription = subscription;

    this.setState(state);
  }

  getCommand(text) {
    return this.state.commands.find(c => c.text === text);
  }

  setState(newState) {
    Object.assign(this.state, newState);
    this.subscription.call(undefined, this);
  }

  pushCommand(newCommand) {
    this.setState({
      commandList: this.state.commandList.concat(newCommand)
    });
  }

  executeKeypress(key) {
    switch (key) {
      case 'UP': {
        if (
          this.state.enteredCommands.pointer <
          this.state.enteredCommands.data.length
        ) {
          this.state.enteredCommands.pointer++;
        }
        break;
      }
      case 'DOWN': {
        if (this.state.enteredCommands.pointer > 0) {
          this.state.enteredCommands.pointer--;
        }
        break;
      }
    }

    this.setState({
      enteredCommands: Object.assign({}, this.state.enteredCommands, {
        currentCommand: this.state.enteredCommands.data[
          this.state.enteredCommands.data.length -
            this.state.enteredCommands.pointer
        ]
      })
    });
  }

  enterCommand(command) {
    command = command.trim();

    const args = command.split(' ');
    const newCommand = { text: command, type: 'command' };
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
        { text: 'command not found: ' + args[0], type: 'error' },
        { text: 'to view available commands type: help', type: 'response' }
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
        this.pushCommand({
          text: `'${name}' does not need any arguments`,
          type: 'error'
        });
        return;
      }
    };

    const commands = {
      pwd() {
        verifyArguments(self.getCommand('pwd').params, 'pwd');

        self.pushCommand({
          text: window.location.host,
          type: 'bold'
        });
      },

      ls() {
        verifyArguments(self.getCommand('ls').params, 'ls');

        self.pushCommand([
          { text: 'index.html', type: 'response' },
          { text: 'app.js', type: 'response' },
          { text: 'style.css', type: 'response' }
        ]);
      },

      clear() {
        verifyArguments(self.getCommand('clear').params, 'clear');

        self.setState({
          commandList: []
        });
      },

      help() {
        verifyArguments(self.getCommand('help').params, 'help');

        self.pushCommand({
          text: 'Available Commands:',
          type: 'bold'
        });

        self.state.commands.forEach(availableCommand => {
          if (!availableCommand.ignored) {
            self.pushCommand({
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
          self.pushCommand({
            text: `type 'open <${self.getCommand('open').params}>'`,
            type: 'warning'
          });
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
          self.pushCommand({
            text: `type 'show <${self.getCommand('show').params}>'`,
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
          window.open(self.state.data.contact.social[site]);
        };

        if (command.length === 1) {
          self.pushCommand({
            text: `type 'social <${self.getCommand('social').params}>'`,
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
          self.pushCommand({
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

    if (command[0] && command.length === 1) {
      commands[command[0]]();
    } else if (command.length > 1) {
      const subCommand = commands[command[0]]();
      if (subCommand[command[1]]) {
        subCommand[command[1]]();
      } else {
        this.pushCommand({
          text:
            command[1] + " is not a proper parameter of '" + command[0] + "'",
          type: 'error'
        });
      }
    }
  }
}
