import { Octokit } from "octokit";
import { GitHubIssue } from "../types/types";
// import moment from "moment";

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
