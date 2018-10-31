import Router from './lib/router';
import Utils from './lib/helpers';
import { render, h } from './lib/vdom';

import store from './store/index.js';
import Resume from './components/resume';
import Console from './components/console';

class App {
  constructor({ store }) {
    this.store = store;
    this.handleConsoleSubmit = this.handleConsoleSubmit.bind(this);
  }

  handleConsoleSubmit(event) {
    event.preventDefault();
    this.store.dispatch('enterCommand', event.target.prompt.value);
    event.target.prompt.value = '';
  }

  render() {
    return (
      <div>
        <div
          className={`console-selector ${
            this.store.state.interactiveMode ? 'interactive-mode' : ''
          }`}
        >
          <Console
            commandList={this.store.state.commandList}
            onEnterCommand={this.handleConsoleSubmit}
            promptValue={
              this.store.state.enteredCommands.currentCommand || { text: '' }
            }
          />
        </div>
        <div className="resume-selector item item--inverse show-interactive">
          <Resume output={this.store.state.currentOutput} />
        </div>
      </div>
    );
  }
}

const appInstance = new App({ store });

store.subscribe(() => {
  render(appInstance.render(), document.querySelector('#app-selector'));
});

appInstance.render();

const router = new Router({
  '/': () => {
    switchModes({ interactive: true });
  },
  '/resume': () => {
    switchModes({ interactive: false });
    if (window.innerWidth <= 768) {
      this.router.go('#/');
    }
  }
});

router.subscribe(path => {
  const navButtons = Array.from(document.querySelector('.nav').children);
  navButtons.forEach(a => a.classList.remove('active'));

  navButtons
    .find(a => a.getAttribute('href') === `#${path}`)
    .classList.add('active');
});

function switchModes({ interactive }) {
  const target = document.querySelector('.wrap');

  if (interactive) {
    target.classList.remove('interactive-mode');
    store.dispatch('setInteractiveMode', false);
  } else {
    target.classList.toggle('interactive-mode');
    store.dispatch('setInteractiveMode', !store.state.interactiveMode);
  }
}

// window.addEventListener(
//   'resize',
//   Utils.throttle(() => {
//     if (window.innerWidth <= 768) {
//       router.go('#/');
//     }
//   }, 250)
// );

// window.addEventListener('keyup', e => {
//   const keyPress = store.state.keyCommands.find(key => key.code === e.which);

//   if (keyPress && document.activeElement.id === 'command-input') {
//     store.executeKeypress(keyPress.action);
//   }
// });
