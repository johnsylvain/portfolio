import Utils from '../lib/helpers';

export class Store {
  constructor(params) {
    const self = this;
    this.actions = {};
    this.reducer = Utils.noop;
    this.state = {};
    this.subscriptions = [];

    if (params.hasOwnProperty('actions')) {
      this.actions = params.actions;
    }

    if (params.hasOwnProperty('reducer')) {
      this.reducer = params.reducer;
    }

    this.state = new Proxy(params.state || {}, {
      set(state, key, value) {
        state[key] = value;
        self.subscriptions.forEach(fn => fn.call(undefined, self.state));
        return true;
      }
    });
  }

  subscribe(fn) {
    this.subscriptions.push(fn);
  }

  dispatch({ type, payload }) {
    if (typeof this.actions[type] !== 'function') {
      return false;
    }

    this.actions[type](this, payload);

    return true;
  }

  commit({ type, payload }) {
    const newState = this.reducer({ type, payload }, this.state);

    this.state = Object.assign(this.state, newState);

    return true;
  }
}
