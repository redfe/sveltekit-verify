export interface BlogSummary {
	slug: string;
	title: string;
}

export interface InitializableBlog {
	slug: string;
	title: string;
	content: string;
	postDateTime: Date;
}

export interface Blog extends InitializableBlog {
	id: string;
}
