export class Command {
  static matchCommand(commands, keyword, argument) {
    const { text, params } =
      commands.find(command => command.text === keyword) || {};
    const match = Array.isArray(params)
      ? params.find(param => param === argument)
      : undefined;

    return {
      commandText: text,
      commandParam: match,
      expectedParamCount: params ? params.length : 0,
      acceptedParams: params
    };
  }

  typeMap = {
    error: 'Error: ',
    warning: 'Warning: ',
    command: '$ '
  };

  constructor(text, type = 'response') {
    this.type = type;
    this.text =
      this.typeMap[this.type] !== undefined
        ? this.typeMap[this.type] + text
        : text;
  }
}
