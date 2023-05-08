import { useState } from "react";
import { GitHubIssue } from "./types/types";
import SearchForm from "./components/SearchForm";
import Issues from "./components/Issues";
import getRepoIssues from "./api/getRepoIssues";
import "./App.css";

const App = () => {
	const [issues, setIssues] = useState<GitHubIssue[]>([]);
	const handleAPICall = (url: string) => {
		getRepoIssues(url).then(result => setIssues(result));
	};

	return (
		<>
      <SearchForm handleAPICall={handleAPICall}/>
      <Issues issues={issues}/>
		</>
	);
};

export default App;
