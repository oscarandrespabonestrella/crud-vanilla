import Component from '../lib/component.js';
import store from '../store/index.js';

export default class Table extends Component {
    constructor(container) {
        super({
            store,
            element: container
        });
    }
    order = "asc";

    sort(event) {
        store.dispatch("sortUsers", { value: event.currentTarget.name, order: this.order });
        this.order = this.order === "asc" ? "desc" : "asc";
    }
    render() {
        let self = this;
        if (store.state.users.length === 0) {
            return `<p class="no-items">You've done nothing yet 😢</p>`;
        }
        self.element.innerHTML = `            
            <table class="products-table">
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th> <a class="sort-by" data-sort name="name-last">Name</a></th>
                        <th><a class="sort-by" data-sort name="email">Email</a></th>
                        <th><a class="sort-by" data-sort name="gender">Gender</a></th>
                        <th><a class="sort-by" data-sort name="phone">Phone</a></th>
                        <th><a class="sort-by" data-sort name="location-city">Location</a></th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="user_table">
                ${store.state.users.map((user, index) => {
            return `
                     <tr>
                        <td data-label="Picture"><img src="${user.picture.thumbnail}" alt="Avatar" class="avatar" /></td>
                        <td data-label="Name">${user.name?.title} ${user.name?.last} ${user.name?.first}</td>
                        <td data-label="Email"> ${user.email} </td>
                        <td data-label="Gender"> ${user.gender} </td>
                        <td data-label="Phone"> ${user.phone} </td>
                        <td data-label="Location"> ${user.location?.city}, ${user.location?.state}, ${user.location?.country} </td>
                        <td class="actions" data-label="Actions">
                            <a class="action_button" id="modify_user" aria-lable="Edit" href="/user/${user?.login?.uuid}" data-link>
                                Edit
                            </a>-
                            <a class="action_button" id="delete_user" aria-lable="Delete" title="Delete">
                                Delete
                            </a>
                        <td>
                    </tr>
                    `
        }).join('')}
                </tbody>            
        `;

        self.element.querySelectorAll('[data-sort]').forEach((button, index) => {
            button.addEventListener('click', this.sort.bind(this));
        });

        self.element.querySelectorAll('a#delete_user').forEach((button, index) => {
            button.addEventListener('click', () => {
                store.dispatch('removeUser', index);
            });
        });

    }

    onDelete(id) {
        store.dispatch('removeUser', id);
    }



}