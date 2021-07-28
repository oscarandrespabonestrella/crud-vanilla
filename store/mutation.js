export default {
    requestUsers(state, payload) {
        state.users = [...payload];
        state.usersMirror = [...payload];
        return state;
    },
    loadMoreUsers(state, payload) {
        state.users = [...state.usersMirror, ...payload];
        state.usersMirror = [...state.usersMirror, ...payload];
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
    },

    sortUsers(state, payload) {
        const route = payload.value.split("-");
        state.users = state.users.sort((a, b) => {
            let comparison = 0;

            if (route.length > 1) {
                if (a[route[0]][route[1]] < b[route[0]][route[1]]) {
                    comparison = -1;
                }
                if (a[route[0]][route[1]] > b[route[0]][route[1]]) {
                    comparison = 1;
                }
            } else if (route.length === 1) {
                if (a[route[0]] < b[route[0]]) {
                    comparison = -1;
                }
                if (a[route[0]] > b[route[0]]) {
                    comparison = 1;
                }
            }
            return (
                (payload.order === 'desc') ? (comparison * -1) : comparison
            );

        });
        return state;
    },

    searchUser(state, payload) {
        state.users = payload !== "" ?
            state.usersMirror.filter(user => (user?.name?.last.toLowerCase().includes(payload.toLowerCase()) || user?.name?.first.toLowerCase().includes(payload.toLowerCase())))
            : state.usersMirror;
        return state;
    }
};