class Store {
  constructor(reducer) {
    this.reducer = reducer;
    this.state = undefined;
    this.subscriptions = [];
  }

  subscribe(handler) {
    this.subscriptions.push(handler);
  }

  dispatch(action) {
    this.state = {
      ...this.state,
      ...this.reducer(this.state, action)
    };
    this.subscriptions.forEach(handler => handler.call(undefined, this.state));
  }
}

export const createStore = reducer => new Store(reducer);
