export type GitHubIssue = {
	user: {
		login: string;
	};
	title: string;
	number: number;
	comments: number;
	created_at: string;
	assignee: {
		login: string;
	} | null;
	assignees: {
		login: string;
	}[];
	state: "open" | "closed";
};