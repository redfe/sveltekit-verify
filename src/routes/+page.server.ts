import type { Actions } from './$types';
import { main } from './storage-demo';
import { fail } from '@sveltejs/kit';

export const actions = {
	runBlobDemo: async ({ request, locals }) => {
		try {
			await main();
			return { message: 'success!' };
		} catch (error: any) {
			return fail(500, { message: 'error:' + error.message });
		}
	}
} satisfies Actions;
