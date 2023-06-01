import { getIssues, getStars } from "../../redux/issues";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {Input} from "antd";
import {WarningFilled} from "@ant-design/icons";

const {Search} = Input;

const SearchForm = () => {
	const wasSearchLinkInvalid = useAppSelector((state) => state.repo.wasSearchLinkInvalid);
	const dispatch = useAppDispatch();
  
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
				status={wasSearchLinkInvalid ? "error": ""}
				prefix={wasSearchLinkInvalid ? <WarningFilled /> : null}
			/>
		</div>
	);
};

export default SearchForm;
