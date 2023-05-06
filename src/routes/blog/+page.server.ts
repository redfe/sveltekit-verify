import type { PageServerLoad, Actions } from './$types';
import type { BlogSummary, InitializableBlog } from '$lib/types';
import { fail } from '@sveltejs/kit';
import * as db from '$lib/server/database';
import { createPage, calcCurrentPage, calcOffset } from '$lib/server/pagination';

const PAGE_SIZE = 3;

export const load = (async ({ locals, request, url }) => {
	let currentPage = calcCurrentPage(url.searchParams.get('page'));
	const offset = calcOffset(currentPage, PAGE_SIZE);
	const { blogs, allCount } = await db.getPage(locals.user.id, offset, PAGE_SIZE);
	const summaries: BlogSummary[] = blogs.map((post) => ({
		id: post.id,
		title: post.title
	}));

	return {
		page: createPage(summaries, allCount, PAGE_SIZE, currentPage)
	};
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request, locals }) => {
		const data = await request.formData();
		const blog: InitializableBlog = {
			user_id: locals.user.id,
			title: data.get('title') as string,
			content: data.get('content') as string,
			postDateTime: new Date()
		};
		try {
			await db.add(blog);
		} catch (error: any) {
			const message = 'エラーです';
			return fail(error.code, {
				error: message,
				...blog
			});
		}
	}
} satisfies Actions;
