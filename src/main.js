import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import 'bulma/css/bulma.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
// Import the Auth0 configuration
import { domain, clientId } from "../auth_config.json";

// Import the plugin here
import { Auth0Plugin } from "./auth";
import {
    faPlus,
    faMinus,
    faTrash,
    faCheck
} from "@fortawesome/free-solid-svg-icons";

// import { from } from "core-js/fn/array";

library.add(faPlus, faMinus, faTrash, faCheck);

Vue.use(Auth0Plugin, {
    domain,
    clientId,
    onRedirectCallback: appState => {
        router.push(
            appState && appState.targetUrl ?
            appState.targetUrl :
            window.location.pathname
        );
    }
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");