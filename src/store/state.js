import resumeJson from '../assets/resume.json';

export default {
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
