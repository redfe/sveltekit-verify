import type { PageServerLoad, Actions } from './$types';
import type { BlogSummary, InitializableBlog } from '$lib/types';
import { fail } from '@sveltejs/kit';
import * as db from '$lib/server/database';

export const load = (async ({ locals }) => {
	const posts = await db.getAll(locals.user.id);

	const summaries: BlogSummary[] = posts.map((post) => ({
		id: post.id,
		slug: post.slug,
		title: post.title
	}));

	return { summaries };
}) satisfies PageServerLoad;

export const actions: Actions = {
	add: async ({ request, locals }) => {
		const data = await request.formData();
		const blog: InitializableBlog = {
			user_id: locals.user.id,
			slug: data.get('slug') as string,
			title: data.get('title') as string,
			content: data.get('content') as string,
			postDateTime: new Date()
		};
		try {
			await db.add(blog);
		} catch (error: any) {
			const message = error.code === 409 ? 'slug が重複しています' : 'エラーです';
			return fail(error.code, {
				error: message,
				...blog
			});
		}
	},
	remove: async ({ request, locals }) => {
		const data = await request.formData();
		await db.remove(data.get('id') as string, locals.user.id);
	}
};
