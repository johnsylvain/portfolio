export class Command {
  static typeMap = {
    error: 'Error: ',
    warning: 'Warning: ',
    command: '$ '
  };

  constructor(text, type = 'response') {
    this.type = type;
    this.text = (Command.typeMap[this.type] || '') + text;
  }
}
