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
