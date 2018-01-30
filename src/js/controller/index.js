import events from '../utils/events'
import model from '../data'

const controller = {
  init () {
    model.currentOutput = model.defaultMessage
  },

  getCurrentOutput () {
    return model.currentOutput
  },

  updateOutput (newOutput) {
    model.currentOutput = newOutput
  },

  executeKeypress (key) {
    if (key === 'UP' || key === 'DOWN') {
      if (key === 'UP' && model.enteredCommands.pointer < model.enteredCommands.data.length)
        model.enteredCommands.pointer++

      if (key === 'DOWN' && model.enteredCommands.pointer > 0)
        model.enteredCommands.pointer--

      const pos = model.enteredCommands.data.length - model.enteredCommands.pointer
      model.enteredCommands.currentCommand = model.enteredCommands.data[pos]
    }

    if (key === 'CLEAR')
      this.executeCommand('clear')

    events.emit('consoleViewRender')
  },

  getKeyCommands () {
    return model.keyCommands
  },

  getEnteredCommands () {
    return model.enteredCommands.currentCommand
      ? model.enteredCommands.currentCommand
      : { text: '' }
  },

  getCommand (text) {
    return model.commands.find(c => c.text === text)
  },

  getCommandList () {
    return model.commandList
  },

  getFileName () {
    return Object.keys(model.currentOutput)[0]
  },

  enterCommand (command) {
    command = command.trim()

    const args = command.split(' ')
    const newCommand = { text: command, type: 'command' }
    const lastCommand = model.enteredCommands.data[model.enteredCommands.data.length - 1]
    const flag = model.commands.find(o => o.text === args[0])

    model.commandList.push(newCommand)

    if (args[0] !== '' && (!lastCommand || command !== lastCommand.text))
      model.enteredCommands.data.push(newCommand)

    model.enteredCommands.pointer = 0

    if (!flag) {
      model.commandList.push(
        { text: 'command not found: ' + args[0], type: 'error' },
        { text: 'to view available commands type: help', type: 'response' }
      )
      events.emit('consoleViewRender')
    }
    else {
      this.executeCommand(command)
    }
  },

  executeCommand (command) {
    const self = this
    const comArgs = command.split(' ')

    const checkArguments = (expected, name) => {
      if (comArgs.length - 1 !== expected) {
        model.commandList.push(
          { text: `'${name}' does not need any arguments`, type: 'error' }
        )
        return
      }
    }

    const commands = {
      pwd () {
        checkArguments(
          controller.getCommand('pwd').params || 0, 'pwd'
        )

        model.commandList.push(
          { text: window.location.host, type: 'bold' }
        )
      },

      ls () {
        checkArguments(
          controller.getCommand('ls').params || 0, 'ls'
        )

        model.commandList.push(
          { text: 'index.html', type: 'response' },
          { text: 'app.js', type: 'response' },
          { text: 'style.css', type: 'response' }
        )

      },

      clear () {
        checkArguments(
          controller.getCommand('clear').params || 0, 'clear'
        )

        model.commandList = []
      },

      help () {
        checkArguments(
          controller.getCommand('help').params || 0, 'help'
        )

        const commands = model.commands
        model.commandList.push(
          { text: 'Available Commands:', type: 'bold' }
        )
        commands.forEach((avalCommand, i) => {
          if (avalCommand.ignored !== true && avalCommand.text !== '') {
            const response = (avalCommand.params !== null)
              ? `- ${avalCommand.text} [${avalCommand.params.toLocaleString()}]`
              : `- ${avalCommand.text}`

            model.commandList.push(
              { text: response, type: 'response' }
            )
          }
        })
      },

      open () {
        const openResume = () => {
          self.updateOutput({ resume: model.data })
        }

        const pdf = () => {
          window.open("http://johnsylvain.me/resume.pdf")
        }
        if (comArgs.length === 1) {
          model.commandList.push(
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
          model.commandList.push(
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
        const subject = comArgs
          .slice(1)
          .reduce((s, w) => `${s} ${w}`)

        window.open(`mailto:hi@johnsylvain.me?subject=${subject}`)
      },

      social () {
        const openLink = (site) => () => {
          window.open(model.data.contact.social[site])
        }

        if (comArgs.length === 1) {
          model.commandList.push(
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
            document.querySelector('#wrapper'),
            document.querySelectorAll('.trash'),
          ]

          document.querySelector('#command-input').disabled = true
          targets.forEach((el) => {
            if (Array.from(el)[0]) {
              el.forEach(e => { e.classList.add('crash') })
            } else {
              el.classList.add('crash')
            }
          })
          window.setTimeout(() => {
            document.querySelector('#command-input').disabled = false
            targets.forEach((el) => {              
              if (Array.from(el)[0]) {
                el.forEach(e => { e.classList.remove('crash') })
              } else {
                el.classList.remove('crash')
              }
            })
            document.querySelector('#command-input').focus()
          }, 4000)
        }

        if (comArgs.length === 1) {
          model.commandList.push(
            { text: `please specify a path`, type: 'warning' }
          )
        } else {
          return {
            '-rf': rf
          }
        }
      }
    }

    model.enteredCommands.pointer = 0
    model.enteredCommands.currentCommand = ''

    if (comArgs[0] !== '' && comArgs.length === 1 || comArgs[0] === 'email') {
      commands[comArgs[0]]()
    } else if (comArgs.length > 1){
      const subCommand = commands[comArgs[0]]()
      if(subCommand[comArgs[1]]) {
        subCommand[comArgs[1]]()
      } else {
        model.commandList.push(
          { text: comArgs[1] + ' is not a proper parameter of \'' + comArgs[0] + '\'', type: 'error' }
        )
      }
    }
    events.emit('resumeContentViewRender')
    events.emit('consoleViewRender')
  }
}

export default controller
