import { Command } from './command';

export class Commands {
  constructor(state) {
    this.state = state;
  }

  help() {
    const { commands } = this.state;
    return {
      newCommandList: [new Command('terminal usage:', 'bold')].concat(
        commands
          .map(availableCommand => {
            if (!availableCommand.ignored) {
              return [
                new Command(
                  `  ${availableCommand.text}${availableCommand.description &&
                    ` <${availableCommand.description}>`}`
                ),
                availableCommand.params &&
                  new Command(`    ${availableCommand.params.join(', ')}`)
              ];
            }
          })
          .reduce((acc, cur) => acc.concat(cur), [])
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

  cd(dirname) {
    switch (dirname) {
      case undefined:
      case '/':
      case '.':
      case '..':
        return {};
      default:
        return {
          newCommandList: [
            new Command(`cd: no such file or directory: ${dirname}`)
          ]
        };
    }
  }

  rm(flag) {
    if (flag === '-rf') {
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
    }
    return {};
  }
}
