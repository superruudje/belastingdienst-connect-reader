import {createApp, defineCustomElement} from "vue";
import {createPinia} from 'pinia';
import {ComponentLibrary} from '@belastingdienst/bldc-components-vue3';

import BelastingdienstConnectReaderCe from "./belastingdienst-connect-reader.ce.vue";

// Create Pinia store instance
const pinia = createPinia();
const element = defineCustomElement(BelastingdienstConnectReaderCe);

// This is needed to ensure Pinia works inside the custom element's lifecycle
const vueApp = createApp(element);
vueApp.use(ComponentLibrary);
vueApp.use(pinia); // Use Pinia in the Vue app

customElements.define("belastingdienst-connect-reader", element);

