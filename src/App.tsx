import SearchForm from "./components/SearchForm";
import Repo from "./components/Repo/Repo";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { getIssues, getStars } from "./redux/issues";
import "./App.css";

const App = () => {
  const repoData = useAppSelector((state) => state.repo);
  const dispatch = useAppDispatch()

  const handleAPICall = (url: string) => {
    dispatch(getIssues(url));
    dispatch(getStars(url));
  };

  return (
    <>
      <SearchForm handleAPICall={handleAPICall} />
      <Repo issues={repoData.issues} urlParts={repoData.urlParts} stars={repoData.repoStars}/>
    </>
  );
};

export default App;
