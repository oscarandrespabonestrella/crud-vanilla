export default {
    requestUsers(state, payload) {
        state.users = [...payload];
        return state;
    },
    loadMoreUsers(state, payload) {
        state.users = [...state.users, ...payload];
        return state;
    },
    removeUser(state, payload) {
        state.users.splice(payload, 1);
        return state;
    },
    editUser(state, payload) {
        const userIndex = state.users.findIndex(x => x?.login?.uuid === payload?.login?.uuid);
        if (userIndex) {
            state.users[userIndex] = { ...payload };
        }
        return state;
    }
};