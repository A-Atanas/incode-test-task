export type GitHubIssue = {
	user: {
		login: string;
	};
	title: string;
	number: number;
	comments: number;
};