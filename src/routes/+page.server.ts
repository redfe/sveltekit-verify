import type { Actions } from './$types';
import { main } from './storage-demo';
import { fail } from '@sveltejs/kit';

export const actions = {
	runBlobDemo: async ({}) => {
		console.log('### start blob demo!');
		try {
			await main();
			return { message: 'success!' };
		} catch (error: any) {
			console.error(error);
			return fail(500, { message: 'error:' + error.message });
		}
	}
} satisfies Actions;
