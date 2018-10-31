export default {
  setInteractiveMode(context, payload) {
    context.commit({ type: 'setInteractiveMode', payload });
  },

  enterCommand(context, payload) {
    context.commit({ type: 'enterCommand', payload });
  }
};
