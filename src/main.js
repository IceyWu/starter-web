import { createApp } from "vue";
import App from "./App.vue";
// unocss
import "uno.css";
// base css
import "./styles/main.css";
// vant css
import "vant/lib/index.css";
import "vant/es/toast/style";
import "vant/es/dialog/style";
import "vant/es/notify/style";
import "vant/es/image-preview/style";

// other
import { router } from "./router";
import pinia from "./store";



const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");