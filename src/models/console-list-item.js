export class ConsoleListItem {
  constructor(text, type) {
    this.type = type || 'response';
    this.text = text;
  }
}
