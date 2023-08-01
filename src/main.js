import { createApp } from 'vue'
import './style.css'
import router from "./router";
import App from './App.vue'
import store from "./store";
import mitt from "mitt";
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import "github-markdown-css/github-markdown-light.css";
const Instance = createApp(App);
Instance.config.globalProperties.$event = new mitt();
Instance.use(store).use(router).mount('#app')
