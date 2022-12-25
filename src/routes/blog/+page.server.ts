import type { PageServerLoad, Action } from './$types';
import type { Blog, BlogSummary } from '$lib/types';
import { fail } from '@sveltejs/kit';
import * as db from '$lib/server/database';

export const load = (async ({ locals }) => {
	console.log('######', locals.user);

	const posts = await db.getAll();

	const summaries: BlogSummary[] = posts.map((post) => ({
		slug: post.slug,
		title: post.title
	}));

	return { summaries };
}) satisfies PageServerLoad;

export const actions = {
	add: (async ({ request }) => {
		const data = await request.formData();
		const blog: Blog = {
			slug: data.get('slug') as string,
			title: data.get('title') as string,
			content: data.get('content') as string,
			postDateTime: new Date()
		};
		await db.add(blog);
	}) satisfies Action,
	remove: (async ({ request }) => {
		const data = await request.formData();
		await db.remove(data.get('slug') as string);
	}) satisfies Action
};
