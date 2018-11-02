export class Store {
  constructor({ actions, reducer, state }) {
    this.actions = actions;
    this.reducer = reducer;
    this.state = state;
    this.subscriptions = [];
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
    this.state = Object.assign({}, this.state, newState);
    this.subscriptions.forEach(fn => fn.call(undefined, this.state));

    return true;
  }
}
