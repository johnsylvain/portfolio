export class Command {
  static matchCommand(commands, keyword, argument) {
    const { text, params } =
      commands.find(command => command.text === keyword) || {};
    const match = Array.isArray(params)
      ? params.find(param => param === argument)
      : undefined;

    return {
      command: {
        text,
        param: match
      },
      expectedParamCount: params ? params.length : 0,
      acceptedParams: params
    };
  }

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
