import { useUrlSearchParams, createGlobalState } from '@vueuse/core';

export const useUrlState = createGlobalState(
	<T = Record<string, unknown>>(
		mode?: Parameters<typeof useUrlSearchParams>[0]
	) => {
		const query = useUrlSearchParams(mode);
		return query as Record<string, unknown> & T;
	}
);
