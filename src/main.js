import { createApp } from "vue";
import App from "./App.vue";
import "uno.css";
import "./styles/main.css";
// import router from './router'
import { router } from "./router";
import store from "./store";
import "amfe-flexible";

createApp(App).use(store).use(router).mount("#app");
