import { Octokit } from "octokit";
import { GitHubIssue } from "../types/types";
import moment from "moment";

const octokit = new Octokit({
	auth: "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",
});

const getRepoIssues = async (url: string): Promise<GitHubIssue[]> => {
	const repo: string = url.split("github.com/")[1];
	return await octokit.request(`GET /repos/${repo}/issues`, {
		per_page: 100,
		since: moment().subtract(1, "days").toISOString()
	}).then(result => result.data);
};

export default getRepoIssues;
