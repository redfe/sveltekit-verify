export interface BlogSummary {
	id: string;
	slug: string;
	title: string;
}

export interface InitializableBlog {
	user_id: string;
	slug: string;
	title: string;
	content: string | null;
	postDateTime: Date;
}

export interface Blog extends InitializableBlog {
	id: string;
}
