import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
    faPlus,
    faMinus,
    faTrash,
    faCheck
} from "@fortawesome/free-solid-svg-icons";

// import { from } from "core-js/fn/array";

library.add(faPlus, faMinus, faTrash, faCheck);


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");