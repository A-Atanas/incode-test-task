import { useState } from "react";
import { GitHubIssue } from "./types/types";
import getRepoIssues from "./api/getRepoIssues";
import "./App.css";

const App = () => {
	const [issues, setIssues] = useState<GitHubIssue[]>([]);
	const handleAPICall = () => {
		getRepoIssues("github.com/facebook/react").then(result => setIssues(result));
	};

	return (
		<>
			<div className="card">
				<button onClick={() => handleAPICall()}>Call GitHub API</button>
			</div>
			{issues.map(({ comments, number, title, user: { login } }) => (
				<ul>
					<li>{title}</li>
					<li>{comments}</li>
					<li>{number}</li>
					<li>{login}</li>
				</ul>
			))}
		</>
	);
};

export default App;
