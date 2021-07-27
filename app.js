import HttpService from "./http.system.js";
import Home from "./pages/home.js";
import UserDetail from "./pages/user-detail.js";
import store from "/store/index.js";


const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Home },
        { path: "/user/:id", view: UserDetail }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#root").innerHTML = "";
    document.querySelector("#root").appendChild(await view.getHtml());
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});


const initDate = async () => {
    const httpService = new HttpService;
    const usersLocal = JSON.parse(localStorage.getItem("state"));
    if (!usersLocal || usersLocal?.users.length === 0) {
        const users = await httpService.get("https://randomuser.me/api/?page=1&results=10")
        store.dispatch("requestUsers", users.results);
    } else {
        store.dispatch("requestUsers", usersLocal?.users);
    }
}

await initDate();