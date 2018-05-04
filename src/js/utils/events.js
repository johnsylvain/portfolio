export default {
  events: {},

  on(name, fn) {
    (this.events[name] || (this.events[name] = [])).push(fn);
  },

  emit(name, data, context) {
    (this.events[name] || []).map(fn => {
      fn.call(context, data);
    });
  }
};
