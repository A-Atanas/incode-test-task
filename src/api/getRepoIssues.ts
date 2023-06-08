import { Octokit } from "octokit";
import { GitHubIssue } from "../types/types";

const octokit = new Octokit({
	auth: "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",
});

const getRepoIssues = async (url: string): Promise<GitHubIssue[]> => {
	return await octokit.request(`GET /repos/${url}/issues`, {
		per_page: 100,
		state: "all"
	}).then(result => result.data);
};

export default getRepoIssues;
