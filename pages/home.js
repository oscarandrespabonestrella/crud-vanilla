import AbstractView from "./AbstractView.js";
import HttpService from "../http.system.js"
import store from '../store/index.js';
import Table from '../components/table.js';
import { stringToHTML } from "../lib/string-to-html.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");

    }

    httpService = new HttpService();
    table = "";
    divTable = document.createElement("div");

    async initData() {
        this.divTable.setAttribute("id", "user_table");
        let tableInstance = new Table(this.divTable);
        tableInstance.render();
    }

    loadMore = async () => {
        const users = await this.httpService.get("https://randomuser.me/api/?page=2&results=10")
        store.dispatch('loadMoreUsers', users.results);
    }

    async getHtml() {
        await this.initData();

        const structure = stringToHTML(`
            <div class="container">
                <div class="row">
                    <div class="col" id="user_table">                    
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button id="load_more">Load more</button>
                    </div>
                </div>
            </div>
        `)
        structure.querySelector("#load_more").addEventListener('click', this.loadMore);
        structure.querySelector("#user_table").appendChild(this.divTable);
        return structure;
    }
}