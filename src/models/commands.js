import { Command } from './command';
import resume from '../constants/resume-data';

export class Commands {
  static commands = [
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
    { text: 'rm', description: '', params: ['-rf'], ignored: true },
    { text: 'exit', description: '', params: null }
  ];

  static match(commands, keyword, argument) {
    const { text, params } =
      commands.find(command => command.text === keyword) || {};
    const match = Array.isArray(params)
      ? params.find(param => param === argument)
      : undefined;

    return {
      command: {
        text,
        param: match
      },
      expectedParamCount: params ? params.length : 0,
      acceptedParams: params
    };
  }

  exit() {
    history.pushState(undefined, undefined, '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    return {};
  }

  help() {
    const { commands } = Commands;
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
    return {
      currentOutput: section === 'resume' ? { resume } : undefined
    };
  }

  show(section) {
    return {
      currentOutput: resume[section]
        ? { [section]: resume[section] }
        : undefined
    };
  }

  social(profile) {
    const link = resume.contact[profile];
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
