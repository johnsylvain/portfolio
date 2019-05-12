export class Command {
  static prefixes = {
    error: 'Error: ',
    warning: 'Warning: ',
    command: '$ '
  };

  constructor(text, type = 'response') {
    this.type = type;
    this.text = (Command.prefixes[this.type] || '') + text;
  }
}
