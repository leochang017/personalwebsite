import { createApp } from "vue";
import { createPinia } from "pinia";
import Root from "./Root.vue";
import { router } from "./router";
import "./styles/base.css";

createApp(Root).use(createPinia()).use(router).mount("#app");
