import { Octokit } from "octokit";
import { GitHubRepoData } from "../types/types";

const octokit = new Octokit({
	auth: "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",
});

const getRepoStars = async (url: string): Promise<GitHubRepoData> => {
	return await octokit.request(`GET /repos/${url}`).then(result => result.data);
};

export default getRepoStars;