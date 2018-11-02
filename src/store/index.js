import actions from './actions';
import reducer from './reducer';
import state from './state';
import { Store } from './store';

export default new Store({
  actions,
  reducer,
  state
});
