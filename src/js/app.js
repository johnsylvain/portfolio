import Router from './utils/router';
import Utils from './utils/helpers';
import { render, h } from './utils/vdom';

import { Store } from './store.js';
import state from './state';

import Resume from './views/resume';
import Console from './views/console';

const BREAK_POINT = 768;

const router = new Router({
  '/': () => {
    switchModes({ interactive: true });
  },
  '/resume': () => {
    switchModes({ interactive: false });
    if (window.innerWidth <= BREAK_POINT) {
      this.router.go('#/');
    }
  }
});

const store = new Store(state, store => {
  render(
    <div>
      <div
        className={`console-selector ${
          store.state.interactiveMode ? 'interactive-mode' : ''
        }`}
      >
        <Console
          commandList={store.state.commandList}
          onEnterCommand={store.enterCommand.bind(store)}
          previousCommand={
            store.state.enteredCommands.currentCommand || { text: '' }
          }
        />
      </div>
      <div className="resume-selector item item--inverse show-interactive">
        <Resume output={store.state.currentOutput} />
      </div>
    </div>,
    document.querySelector('#app-selector')
  );
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
    store.setState({
      interactiveMode: false
    });
  } else {
    target.classList.toggle('interactive-mode');
    store.setState({
      interactiveMode: !store.state.interactiveMode
    });
  }
}

window.addEventListener(
  'resize',
  Utils.throttle(() => {
    if (window.innerWidth <= BREAK_POINT) {
      router.go('#/');
    }
  }, 250)
);

window.addEventListener('keyup', e => {
  const keyPress = store.state.keyCommands.find(key => key.code === e.which);

  if (keyPress && document.activeElement.id === 'command-input') {
    store.executeKeypress(keyPress.action);
  }
});
