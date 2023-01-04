import type { Page } from '$lib/types';

export const createPage = <T>(
	items: T[],
	allCount: number,
	pageSize: number,
	currentPage: number
): Page<T> => {
	const devided = allCount / pageSize;
	const floored = Math.floor(devided);
	return {
		items: items,
		pageSize: pageSize,
		currentPage: currentPage,
		maxPage: floored + (floored < devided ? 1 : 0),
		hasNext: currentPage * pageSize < allCount
	};
};

export const calcCurrentPage = (pageParam: string | null) => {
	const parsedPage = parseInt(pageParam ?? '1');
	return isNaN(parsedPage) ? 1 : parsedPage < 1 ? 1 : parsedPage;
};

export const calcOffset = (currentPage: number, pageSize: number) => {
	return currentPage < 1 ? 0 : (currentPage - 1) * pageSize;
};
