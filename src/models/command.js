export class Command {
  constructor(text, type = 'response') {
    const typeMap = {
      error: 'Error: ',
      warning: 'Warning: ',
      command: '$ '
    };
    this.type = type;
    this.text =
      typeMap[this.type] !== undefined ? typeMap[this.type] + text : text;
  }
}
