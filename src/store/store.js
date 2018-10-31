export class Store {
  constructor(params) {
    const self = this;
    this.actions = {};
    this.mutations = {};
    this.state = {};
    this.subscriptions = [];

    if (params.hasOwnProperty('actions')) {
      this.actions = params.actions;
    }

    if (params.hasOwnProperty('mutations')) {
      this.mutations = params.mutations;
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

  dispatch(actionKey, payload) {
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey}" doesn't exist.`);
      return false;
    }

    console.groupCollapsed(`ACTION: ${actionKey}`);

    this.actions[actionKey](this, payload);

    console.groupEnd();

    return true;
  }

  commit(mutationKey, payload) {
    if (typeof this.mutations[mutationKey] !== 'function') {
      console.error(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    const newState = this.mutations[mutationKey](this.state, payload);

    this.state = Object.assign(this.state, newState);

    return true;
  }
}
