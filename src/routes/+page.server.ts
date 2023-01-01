import type { Actions } from './$types';
import { main } from './storage-demo';

export const actions = {
	runBlobDemo: async ({}) => {
		try {
			await main();
			return { message: 'success!' };
		} catch (error: any) {
			console.error(error);
			return { message: 'error:' + error.message };
		}
	}
} satisfies Actions;
