export class Store {
  constructor({ reducer, state }) {
    this.reducer = reducer;
    this.state = state;
    this.subscriptions = [];
  }

  subscribe(handler) {
    this.subscriptions.push(handler);
  }

  dispatch(action) {
    const newState = this.reducer(action, this.state);
    this.state = Object.assign({}, this.state, newState);
    this.subscriptions.forEach(handler => handler.call(undefined, this.state));
  }
}
