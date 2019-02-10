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
    { text: 'rm', description: '', params: ['-rf'], ignored: true }
  ],
  data: resumeJson.resume
};
