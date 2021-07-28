import AbstractView from "./AbstractView.js";
import { stringToHTML } from "../lib/string-to-html.js";
import store from '../store/index.js';

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("User Crud - User detail");
        this.initUser(params.id);
    }

    userData = {};

    name = ((el) => {
        return {
            set name(v) {
                el.value = v
            },
            get name() {
                return el.value
            }
        }
    })(document.getElementById("name"));

    initUser(id) {
        this.userData = store.state.users.find(x => x?.login?.uuid === id);
    }
    logSubmit(event) {
        event.preventDefault();
        console.log(`Form Submitted! Time stamp: ${event.timeStamp}`);
        store.dispatch("editUser", this.userData);
    }
    updateForm(event) {
        const mapper = event.currentTarget.name.split("-");
        if (mapper && mapper.length) {
            if (mapper.length === 1) {
                this.userData[mapper[0]] = event.currentTarget.value;
            } else {
                this.userData[mapper[0]][mapper[1]] = event.currentTarget.value;
            }
        }
    }
    goBack(e) {
        e.preventDefault();
        console.log('aquie')
        window.history.go(-1);
    }

    async getHtml() {
        const form = stringToHTML(`
            <div class="container" style="margin-top: 2em;">                
                
            <form class="user-form" id="user_form">
                <div class="container-form">
                    <div class="row">
                        <div class="col-8">
                            <h2>Edit User: ${this.userData?.name?.last} ${this.userData?.name?.first}</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2">
                            <label for="title">title</label>
                            <select name="name-title" value="${this.userData.name.title}" data-user-select>
                                <option value="Mr">Mr</option>
                                <option value="Ms">Ms</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <div class="col-5">
                            <label for="title">First Name</label>
                            <input name="name-first" placeholder="First Name" type="text" value="${this.userData.name.first}" data-user-input/>
                        </div>
                        <div class="col-5">
                            <label for="title">Last Name</label>
                            <input name="name-last" placeholder="First Name" type="text" value="${this.userData.name.last}" data-user-input/>
                        </div>                    
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <label for="title">Username</label>
                            <input name="login-username" placeholder="Username" type="text" value="${this.userData.login.username}" data-user-input/>
                        </div>
                        <div class="col-4">
                            <label for="title">Password</label>
                            <input name="login-password" placeholder="Password" type="password" data-user-input/>
                        </div>
                        <div class="col-4">
                            <label for="title">Verify Password</label>
                            <input name="verifyPassword" placeholder="password" type="password" data-user-input/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label for="title">Email</label>
                            <input placeholder="Email" type="email" value="${this.userData.email}" data-user-input/>
                        </div>
                        <div class="col-6">
                            <label for="title">Birthdate</label>
                            <input name="dob-date" placeholder="birthdate" type="date" value="${new Date(this.userData?.dob?.date).toISOString().substr(0, 10)}" data-user-select/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label for="title">Mobile phone Number</label>
                            <input name="cell" placeholder="Mobile phone" type="cell" value="${this.userData.cell}" data-user-input/>
                        </div>
                        <div class="col-6">
                            <label for="title">Phone</label>
                            <input name="phone" placeholder="Phone" type="text" value="${this.userData.phone}" data-user-input/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12-sm col-2">
                            <button type="submit" class="btn w-100 btn-primary">Save</button>
                        </div>
                        <div class="col-12-sm col-2">
                            <a href="/" class="btn w-100" data-link>Cancel</a>
                        </div>
                    </div>
                    </div>
                    </form>
                    </div>
        `);
        form.querySelectorAll('[data-user-input]').forEach((input) => {
            input.addEventListener('keyup', this.updateForm.bind(this))
        });
        form.querySelectorAll('[data-user-select]').forEach((input) => {
            input.addEventListener('change', this.updateForm.bind(this));
        });
        form.querySelector('form#user_form').addEventListener('submit', this.logSubmit);
        // form.querySelector('[data-link-user]').addEventListener('click', this.goBack);



        return form;


    }
}