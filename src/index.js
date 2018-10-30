import Router from './utils/router';
import Utils from './utils/helpers';
import { render, h } from './utils/vdom';

import { Store } from './store';
import App from './components/app';

import resumeJson from './data/resume.json';

const BREAK_POINT = 768;

const initialState = {
  interactiveMode: false,
  keyCommands: [{ code: 38, action: 'UP' }, { code: 40, action: 'DOWN' }],
  commandList: [
    {
      text: "type 'help' to view commands",
      type: 'response'
    }
  ],
  enteredCommands: {
    data: [],
    currentCommand: '',
    pointer: 0
  },
  currentOutput: {
    instructions: [
      "to view my resume, type 'open resume' in the terminal to the left",
      "type 'help' to view other commands"
    ]
  },
  commands: [
    { text: '', params: null, ignored: true },
    { text: 'help', params: null },
    { text: 'clear', params: null },
    { text: 'exit', params: null },
    { text: 'pwd', params: null, ignored: true },
    { text: 'ls', params: null, ignored: true },
    { text: 'open', params: ['resume'] },
    { text: 'show', params: ['education', 'skills', 'xp', 'projects'] },
    { text: 'social', params: ['github', 'linkedin'] },
    { text: 'rm', params: ['-rf'], ignored: true }
  ],
  data: resumeJson.resume
};

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

const store = new Store(initialState);

store.subscribe(() => {
  render(<App store={store} />, document.querySelector('#app-selector'));
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
