import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";

import {
  install as MonacoEditorPlugin,
  loader
} from "@guolao/vue-monaco-editor";

// ✅ Must call this BEFORE `app.use(...)`
loader.config({
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs"
  }
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(MonacoEditorPlugin);
app.mount("#app");
