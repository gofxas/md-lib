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

const eventbus = new mitt();
document.body.addEventListener('click', function () {
    var target = event.target || event.srcElement;
    if (target.nodeName.toLocaleLowerCase() === 'a') {
        console.log('当前点击的 a 标签: ', target);
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            window.event.returnValue = true;
        }        
        var url = target.getAttribute("href")
        if (window.appContext && window.appContext.electron()) {
            const req = window.confirm("将使用默认浏览器打开外部链接");
            if (req) {
                appContext.ipc.send('outerlink', url);
            }
        } else {
            if (target.getAttribute("target") === '_blank') {
                window.open(url)
            } else {
                window.location.href = url
            }
        }
    }
});
const Instance = createApp(App);
Instance.config.globalProperties.$event = eventbus;
Instance.use(store).use(router).mount('#app')
