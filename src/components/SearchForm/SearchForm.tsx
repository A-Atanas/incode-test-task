import { getIssues, getStars } from "../../redux/issues";
import { useAppDispatch } from "../../redux/hooks";
import {Input} from "antd";

const {Search} = Input;

const SearchForm = () => {
	const dispatch = useAppDispatch()
  
	const handleAPICall = (url: string) => {
	  dispatch(getIssues(url));
	  dispatch(getStars(url));
	};

	return (
		<div>
			<Search
				addonBefore="https://github.com/"
				enterButton="Get issues"
				placeholder="repo-owner/repository-name"
				onSearch={handleAPICall}
			/>
		</div>
	);
};

export default SearchForm;
