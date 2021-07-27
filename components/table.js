import Component from '../lib/component.js';
import store from '../store/index.js';

export default class Table extends Component {
    constructor(container) {
        super({
            store,
            element: container
        });
    }
    render() {
        let self = this;
        if (store.state.users.length === 0) {
            return `<p class="no-items">You've done nothing yet 😢</p>`;
        }
        self.element.innerHTML = `
            ${store.state.users.length}
            <table class="products-table">
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="user_table">
                ${store.state.users.map((user, index) => {
            return `
                     <tr>
                        <td><img src="${user.picture.thumbnail}" alt="Avatar" /></td>
                        <td>${user.name?.title} ${user.name?.last} ${user.name?.first}</td>
                        <td> ${user.email} </td>
                        <td> ${user.gender} </td>
                        <td> ${user.phone} </td>
                        <td> ${user.location?.city}, ${user.location?.state}, ${user.location?.country} </td>
                        <td>
                            <a id="modify_user" aria-lable="Edit" href="/user/${user?.login?.uuid}" data-link>Edit</a>
                            <button id="delete_user" aria-lable="Delete">Delete</button>
                        <td>
                    </tr>
                    `
        }).join('')}
                </tbody>            
        `;

        self.element.querySelectorAll('button#delete_user').forEach((button, index) => {
            button.addEventListener('click', () => {
                store.dispatch('removeUser', index);
            });
        });

    }

    onDelete(id) {
        store.dispatch('removeUser', id);
    }



}