import events from '../utils/events';
import model from '../data';

class Command {
  constructor(text, type) {
    this.text = text
    this.type = type
  }
}

const controller = {
  init () {
    model.currentOutput = model.defaultMessage;
    model.socialProfiles = Object.keys(model.data.contact.social)
  },

  getResumeData () {
    return model.data;
  },

  getDefaultData () {
    return model.defaultMessage;
  },

  getCurrentOutput () {
    return model.currentOutput;
  },

  updateOutput (newOutput) {
    model.currentOutput = newOutput;
  },

  executeKeypress (key) {
    if (key === 'UP' || key === 'DOWN') {
      if(key === 'UP' &&
      model.enteredCommands.pointer < model.enteredCommands.data.length) {
        model.enteredCommands.pointer += 1;
      }
      if(key === 'DOWN' && model.enteredCommands.pointer > 0) {
        model.enteredCommands.pointer -= 1;
      }

      let pos = model.enteredCommands.data.length - model.enteredCommands.pointer;
      model.enteredCommands.currentCommand = model.enteredCommands.data[pos];

    }

    if(key === 'CLEAR') {
      this.executeCommand('clear');
    }

    // consoleView.render();
    events.emit('consoleViewRender', null);
  },

  getKeyCommands () {
    return model.keyCommands;
  },

  getEnteredCommands () {
    return model.enteredCommands.currentCommand
      ? model.enteredCommands.currentCommand
      : { text: '' }
  },

  getCommand (text) {
    return model.commands.filter(c => c.text === text)
  },

  getPreviousCommands (){
    return model.previousCommands;
  },

  getFileName (){
    return Object.keys(model.currentOutput)[0];
  },

  enterCommand (command) {
    command = command.trim();

    let flag = false;
    const args = command.split(' ');

    if (args[0] !== '') {
      const newCommand = new Command(command, 'command')

      model.previousCommands.push(newCommand);

      const lastCommand = model.enteredCommands.data[model.enteredCommands.data.length - 1];
      if (lastCommand) {
        if(command !== lastCommand.text){
          model.enteredCommands.data.push(newCommand);
        }
      } else {
        model.enteredCommands.data.push(newCommand);
      }

      model.enteredCommands.pointer = 0;
    }

    flag = model.commands.filter(o => o.text === args[0])

    if (!flag.length) {
      model.previousCommands.push(
        new Command('command not found: ' + args[0], 'error'),
        new Command('to view available commands type: help', 'response')
      );
    } else {
      this.executeCommand(command);
    }
    // consoleView.render();
    events.emit('consoleViewRender', null);
  },

  executeCommand (command) {
    const self = this
    const comArgs = command.split(' ');

    let commands = {
      pwd () {
        if(comArgs.length !== 1) {
          model.previousCommands.push(
            new Command("'pwd' does not need any arguments", 'error')
          );
          // consoleView.render();
          events.emit('consoleViewRender', null);

          return;
        }

        model.previousCommands.push(
          new Command(window.location.host, 'bold')
        )
      },

      ls () {
        if(comArgs.length !== 1) {
          model.previousCommands.push(
            new Command("'ls' does not need any arguments", 'error')
          );
          // consoleView.render();
          events.emit('consoleViewRender', null);

          return;
        }

        model.previousCommands.push(
          new Command('index.html', 'response'),
          new Command('app.js', 'response'),
          new Command('style.css', 'response')
        )

      },

      clear () {
        if (comArgs.length !== 1){
          model.previousCommands.push(
            new Command("'clear' does not need any arguments", 'error')
          );
          return;
        }

        model.previousCommands = [];
      },

      help () {
        const commands = model.commands;
        model.previousCommands.push(
          new Command('Available Commands:', 'bold')
        );
        commands.forEach(function(avalCommand, i) {
          if (avalCommand.ignored !== true && avalCommand.text !== '') {
            const response = (avalCommand.params !== null)
              ? `- ${avalCommand.text} [${avalCommand.params.toLocaleString()}]`
              : `- ${avalCommand.text}`

            model.previousCommands.push(
              new Command(response, 'response')
            );
          }
        })
      },

      open () {
        const openResume = () => {
          self.updateOutput({ resume: model.data })
          events.emit('resumeContentViewRender', null);
        };

        const pdf = () => {
          window.open("http://johnsylvain.me/resume.pdf");
        }
        if (comArgs.length === 1) {
          model.previousCommands.push(
            new Command("type 'open [" + controller.getCommand('open')[0].params + "]'", 'warning')
          )
        } else {
          return {
            resume: openResume,
            pdf: pdf
          }
        }
      },

      show () {
        const showSection = (section) => () => {
          self.updateOutput({
            [section]: model.data[section]
          })
          events.emit('resumeContentViewRender', null);
        }

        if (comArgs.length === 1) {
          model.previousCommands.push(
            new Command("type 'show [" + controller.getCommand('show')[0].params + "]'", 'warning')
          )
        } else {
          return {
            education: showSection('education'),
            skills: showSection('skills'),
            xp: showSection('experience'),
            projects: showSection('projects')
          }
        }
      },

      email () {
        let subject = '';
        for (let i = 1; i < comArgs.length; i++) {
          subject += (' ' + comArgs[i])
        };
        window.open('mailto:hi@johnsylvain.me?subject=' + subject);
      },

      social (){
        const openLink = (site) => () => {
          window.open(model.data.contact.social[site])
        }

        if (comArgs.length === 1) {
          model.previousCommands.push(
            new Command("type 'social [" + controller.getCommand('social')[0].params + "]'", 'warning')
          )
        } else {
          return{
            github: openLink('github'),
            linkedin: openLink('linkedin')
          }
        }
      },

      rm () {
        const rf = () => {
          const targets = [
            document.getElementById('wrapper'),
            document.getElementsByClassName('trash'),
          ];

          document.getElementById('command-input').disabled = true;
          targets.forEach(function(el, i) {
            if(Array.from(el)[0]){
              Array.from(el).forEach(function(e) {
                e.classList.add('crash');
              })
            } else {
              el.classList.add('crash');

            }
          })
          window.setTimeout(function(){
            document.getElementById('command-input').disabled = false;

            targets.forEach(function(el, i) {
              if(Array.from(el)[0]){
                Array.from(el).forEach(function(e) {
                  e.classList.remove('crash');
                })
              } else {
                el.classList.remove('crash');
              }
            })

            document.getElementById('command-input').focus();

          }, 4000)
        }

        if (comArgs.length === 1) {
          model.previousCommands.push(
            new Command('error', 'error')
          );
        } else {
          return {
            '-rf': rf
          }

        }
      }
    }

    model.enteredCommands.pointer = 0;
    model.enteredCommands.currentCommand = '';
    // consoleView.render();
    events.emit('resumeContentViewRender', null);

    
    if (comArgs.length === 1) {
      commands[comArgs[0]]();
    } else if(comArgs[0] === 'email'){
      commands[comArgs[0]]();
    } else if (comArgs.length > 1){
      const subCommand = commands[comArgs[0]]();
      if(subCommand[comArgs[1]]) {
        subCommand[comArgs[1]]()
      } else {
        model.previousCommands.push(
          new Command(comArgs[1] + ' is not a proper parameter of \'' + comArgs[0] + '\'', 'error')
        )
      }
    }
  }
}

export default controller;
