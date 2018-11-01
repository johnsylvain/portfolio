import { Command } from './command';

export class Commands {
  constructor(state) {
    this.state = state;
  }

  help() {
    const { commands } = this.state;
    return {
      newCommandList: [new Command('Available commands:', 'bold')].concat(
        commands
          .map(availableCommand => {
            if (!availableCommand.ignored) {
              return new Command(
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

  open(section) {
    const { currentOutput, data } = this.state;
    return {
      currentOutput: section === 'resume' ? { resume: data } : currentOutput
    };
  }

  exit() {
    window.location.hash = '/';
    return {};
  }

  show(section) {
    const { data } = this.state;
    return {
      currentOutput: data[section] ? { [section]: data[section] } : undefined
    };
  }

  social(profile) {
    const link = this.state.data.contact.social[profile];
    if (link) {
      window.open(link);
    }
    return {};
  }

  ls() {
    return {
      newCommandList: [
        new Command('index.html'),
        new Command('app.js'),
        new Command('style.css')
      ]
    };
  }

  pwd() {
    return {
      newCommandList: [new Command(window.location.host)]
    };
  }
}
