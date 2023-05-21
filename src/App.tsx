import { useState } from "react";
import { GitHubIssue } from "./types/types";
import SearchForm from "./components/SearchForm";
import Repo from "./components/Repo/Repo";
import getRepoIssues from "./api/getRepoIssues";
import getRepoStars from "./api/getRepoStars";
import "./App.css";

const App = () => {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [url, setUrl] = useState<string[]>([]);
  const [stars, setStars] = useState<number>(0);

  const handleAPICall = (url: string) => {
    getRepoIssues(url).then((result) => {
      setIssues(result);
	    setUrl(url.split("/"));
    });
    getRepoStars(url).then((result) => setStars(result.stargazers_count))
  };

  return (
    <>
      <SearchForm handleAPICall={handleAPICall} />
      <Repo issues={issues} url={url} stars={stars}/>
    </>
  );
};

export default App;
