import json from './resume.json';

export default {
  keyCommands: [
    { code: 38, shortcut: null, action: 'UP' },
    { code: 40, shortcut: null, action: 'DOWN' },
    { code: 75, shortcut: 'ctrlKey', action: 'CLEAR' }
  ],
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
    { text: '', params: null },
    { text: 'help', params: null },
    { text: 'clear', params: null },
    { text: 'pwd', params: null, ignored: true },
    { text: 'ls', params: null, ignored: true },
    { text: 'open', params: ['resume'] },
    { text: 'show', params: ['education', 'skills', 'xp', 'projects'] },
    { text: 'social', params: ['github', 'linkedin'] },
    { text: 'rm', params: ['-rf'], ignored: true }
  ],
  data: json.resume
};
