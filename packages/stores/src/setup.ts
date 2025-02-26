import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { App } from 'vue';

const stores = createPinia();

const setupStore = (app: App) => {
	stores.use(piniaPluginPersistedstate);
	app.use(stores);
};

export { stores, setupStore };
