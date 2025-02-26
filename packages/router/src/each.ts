import type { Router } from 'vue-router';

export class RouterEach {
	/**
	 * @description 路由命名空间
	 */
	namespace: string;

	router: Router;

	constructor(router: Router, namespace: string) {
		this.namespace = namespace;
		this.router = router;
	}

	setupBeforeEach() {
		this.router.beforeEach(async (to, from, next) => {
			next();
		});
	}

	setupAfterEach() {
		this.router.afterEach(async () => {
			window.scrollTo(0, 0);
		});
	}

	setupEach() {
		this.setupBeforeEach();
		this.setupAfterEach();
	}
}
