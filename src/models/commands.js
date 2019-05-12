import { Command } from './command';
import resume from '../constants/resume-data';

export class Commands {
  static commands = {
    help: { description: '', params: null },
    clear: { description: '', params: null, ignored: true },
    pwd: { description: '', params: null, ignored: true },
    ls: { description: '', params: null, ignored: true },
    cd: { description: '', params: null, ignored: true },
    open: { description: 'file', params: ['resume'] },
    show: {
      description: 'section',
      params: Object.keys(resume).filter(
        param => param !== 'name' && param !== 'title'
      )
    },
    social: {
      description: 'profile',
      params: Object.keys(resume.contact)
    },
    rm: { description: '', params: ['-rf'], ignored: true }
  };

  static match(keyword, argument) {
    const matchedCommand = Object.entries(Commands.commands).find(
      ([text]) => text === keyword
    );
    const [text, { params }] = matchedCommand || [undefined, {}];
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

  help() {
    const { commands } = Commands;
    return {
      newCommandList: [new Command('terminal usage:', 'bold')].concat(
        Object.entries(commands)
          .map(([keyword, commandDetails]) => {
            if (!commandDetails.ignored) {
              return [
                new Command(
                  `  ${keyword}${commandDetails.description &&
                    ` <${commandDetails.description}>`}`
                )
              ].concat(
                commandDetails.params &&
                  commandDetails.params.map(
                    param => new Command(`    ${param}`, 'light')
                  )
              );
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
      currentOutput: Commands.commands.show.params.includes(section)
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
