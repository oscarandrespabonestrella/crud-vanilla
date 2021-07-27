import actions from './actions.js';
import mutations from './mutation.js';
import state from './state.js';
import Store from './store.js';

export default new Store({
    actions,
    mutations,
    state
});