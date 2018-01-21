import events from '../utils/events';
import model from '../data';

const controller = {
  init () {
    model.currentOutput = model.defaultMessage;
    model.socialProfiles = Object.keys(model.data.contact.social)
  },

  getCurrentOutput () {
    return model.currentOutput;
  },

  updateOutput (newOutput) {
    model.currentOutput = newOutput;
  },

  executeKeypress (key) {
    if (key === 'UP' || key === 'DOWN') {
      if (key === 'UP' && model.enteredCommands.pointer < model.enteredCommands.data.length)
        model.enteredCommands.pointer += 1;

      if (key === 'DOWN' && model.enteredCommands.pointer > 0)
        model.enteredCommands.pointer -= 1;

      const pos = model.enteredCommands.data.length - model.enteredCommands.pointer;
      model.enteredCommands.currentCommand = model.enteredCommands.data[pos];
    }

    if (key === 'CLEAR')
      this.executeCommand('clear');

    events.emit('consoleViewRender')
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
    return model.commands.find(c => c.text === text)
  },

  getPreviousCommands (){
    return model.previousCommands;
  },

  getFileName (){
    return Object.keys(model.currentOutput)[0];
  },

  enterCommand (command) {
    command = command.trim()

    let flag = false
    const args = command.split(' ')

    if (args[0] !== '') {
      const newCommand = { text: command, type: 'command' }

      model.previousCommands.push(newCommand)

      const lastCommand = model.enteredCommands.data[model.enteredCommands.data.length - 1]
      if (lastCommand) {
        if (command !== lastCommand.text)
          model.enteredCommands.data.push(newCommand)
      } else
        model.enteredCommands.data.push(newCommand)

      model.enteredCommands.pointer = 0
    }

    flag = model.commands.find(o => o.text === args[0])

    if (!flag)
      model.previousCommands.push(
        { text: 'command not found: ' + args[0], type: 'error' },
        { text: 'to view available commands type: help', type: 'response' }
      )
    else
      this.executeCommand(command)

    events.emit('consoleViewRender')
  },

  executeCommand (command) {
    const self = this
    const comArgs = command.split(' ');

    const checkArguments = (expected, name) => {
      if (comArgs.length !== expected) {
        model.previousCommands.push(
          { text: `'${name}' does not need any arguments`, type: 'error' }
        )
        return
      }
    }

    const commands = {
      pwd () {
        checkArguments(
          controller.getCommand('pwd').params || 1, 
          'pwd'
        )

        model.previousCommands.push(
          { text: window.location.host, type: 'bold' }
        )
      },

      ls () {
        checkArguments(
          controller.getCommand('ls').params || 1, 
          'ls'
        )

        model.previousCommands.push(
          { text: 'index.html', type: 'response' },
          { text: 'app.js', type: 'response' },
          { text: 'style.css', type: 'response' }
        )

      },

      clear () {
        checkArguments(
          controller.getCommand('clear').params || 1, 
          'clear'
        )

        model.previousCommands = [];
      },

      help () {
        checkArguments(
          controller.getCommand('help').params || 1, 
          'help'
        )

        const commands = model.commands;
        model.previousCommands.push(
          { text: 'Available Commands:', type: 'bold' }
        );
        commands.forEach((avalCommand, i) => {
          if (avalCommand.ignored !== true && avalCommand.text !== '') {
            const response = (avalCommand.params !== null)
              ? `- ${avalCommand.text} [${avalCommand.params.toLocaleString()}]`
              : `- ${avalCommand.text}`

            model.previousCommands.push(
              { text: response, type: 'response' }
            );
          }
        })
      },

      open () {
        const openResume = () => {
          self.updateOutput({ resume: model.data })
        }

        const pdf = () => {
          window.open("http://johnsylvain.me/resume.pdf");
        }
        if (comArgs.length === 1) {
          model.previousCommands.push(
            { text: `type 'open [${controller.getCommand('open').params}]'`, type: 'warning' }
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
        }

        if (comArgs.length === 1) {
          model.previousCommands.push(
            { text: `type 'show [${controller.getCommand('show').params}]'`, type: 'warning' }
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
            { text: `type 'social [${controller.getCommand('social').params}]'`, type: 'warning' }
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
            { text: 'error', type: 'error' }
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
          { text: comArgs[1] + ' is not a proper parameter of \'' + comArgs[0] + '\'', type: 'error' }
        )
      }
    }

    events.emit('resumeContentViewRender');
  }
}

export default controller;
