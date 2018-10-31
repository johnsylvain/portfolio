export default {
  setInteractiveMode(context, payload) {
    context.commit('setInteractiveMode', payload);
  },

  enterCommand(context, payload) {
    context.commit('enterCommand', payload);
  }
};
