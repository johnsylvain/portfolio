const events = {
  events: {},

  on(name, fn) {
    (this.events[name] || (this.events[name] = [])).push(fn);
  },

  off(name, fn) {
    this.events[name].splice(this.events[name].indexOf(fn) >>> 0, 1);
  },

  emit(name, data, context) {
    (this.events[name] || []).map(fn => { fn.call(context, data) });
  }
};

export default events;
