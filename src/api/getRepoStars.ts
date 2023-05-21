import { Octokit } from "octokit";
import { GitHubRepoData } from "../types/types";

const octokit = new Octokit({
	auth: "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",
});

const getRepoStars = async (url: string): Promise<GitHubRepoData> => {
	return await octokit.request(`GET /repos/${url}`).then(result => result.data);
};

export default getRepoStars;