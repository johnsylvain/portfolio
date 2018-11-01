import resumeJson from '../assets/resume.json';
import { Command } from '../models/command';

export default {
  interactiveMode: false,
  keyCommands: [{ code: 38, action: 'UP' }, { code: 40, action: 'DOWN' }],
  commandList: [new Command("type 'help' to view commands")],
  enteredCommands: {
    data: [],
    currentCommand: '',
    pointer: 0
  },
  currentOutput: [
    "to view my resume, type 'open resume' in the terminal to the left",
    "type 'help' to view other commands"
  ],
  commands: [
    { text: '', params: null, ignored: true },
    { text: 'help', params: null },
    { text: 'clear', params: null, ignored: true },
    { text: 'exit', params: null },
    { text: 'pwd', params: null, ignored: true },
    { text: 'ls', params: null, ignored: true },
    { text: 'cd', params: null, ignored: true },
    { text: 'open', params: ['resume'] },
    { text: 'show', params: ['education', 'skills', 'experience', 'projects'] },
    { text: 'social', params: ['github', 'linkedin'] },
    { text: 'rm', params: ['-rf'], ignored: true }
  ],
  data: resumeJson.resume
};
