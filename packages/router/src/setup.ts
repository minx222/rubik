import type { App } from 'vue';
import type { Router } from 'vue-router';
import { RouterEach } from './each';
export const setupRouter = (router: Router, namespce: string) => {
	const each = new RouterEach(router, namespce);
	each.setupEach();

	return <T>(app: App<T>) => {
		app.use(router);

		return {
			router,
			each
		};
	};
};
