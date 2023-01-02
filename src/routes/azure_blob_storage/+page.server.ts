import type { Actions } from './$types';
import { main, getSasUrl } from './storage-demo';

export const actions = {
	runBlobDemo: async ({}) => {
		try {
			await main();
			return createData({ message: 'success!' });
		} catch (error: any) {
			console.error(error);
			return createData({ message: 'error:' + error.message });
		}
	},
	getSasUrl: async ({ request, locals }) => {
		try {
			const fileName = (await request.formData()).get('fileName') as string;
			const sasUrl = await getSasUrl(locals.user.id, fileName);
			return createData({ sasUrl: sasUrl });
		} catch (error: any) {
			console.error(error);
			return createData({ sasMessage: 'error:' + error.message });
		}
	}
} satisfies Actions;

type Args = {
	message?: string;
	sasUrl?: string;
	sasMessage?: string;
};
const createData = (args: Args) => {
	return {
		message: args.message,
		sasUrl: args.sasUrl,
		sasMessage: args.sasMessage
	};
};
