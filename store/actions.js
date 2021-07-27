export default {
    requestUsers(context, payload) {
        context.commit('requestUsers', payload);
    },
    loadMoreUsers(context, payload) {
        context.commit('loadMoreUsers', payload);
    },
    removeUser(context, payload) {
        context.commit('removeUser', payload);
    },
    editUser(context, payload) {
        context.commit('editUser', payload);

    }

};