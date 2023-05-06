export interface User {
	id: string;
	name: string;
}

export interface BlogSummary {
	id: string;
	title: string;
}

export interface InitializableBlog {
	user_id: string;
	title: string;
	content: string | null;
	postDateTime: Date;
}

export interface Blog extends InitializableBlog {
	id: string;
}

export interface Page<ITEM> {
	items: ITEM[];
	currentPage: number;
	maxPage: number;
	pageSize: number;
	hasNext: boolean;
}
