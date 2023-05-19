import { useState } from "react";
import {Input} from "antd";

const {Search} = Input;

type Props = {
	handleAPICall: (url: string) => void;
};

const SearchForm = (props: Props) => {
	const [url, setUrl] = useState("");

	return (
		<div>
			<Search
				addonBefore="https://github.com/"
				enterButton="Get issues"
				value={url}
				placeholder="repo-owner/repository-name"
				onChange={event => setUrl(event.target.value)}
				onSearch={() => props.handleAPICall(url)}
			/>
		</div>
	);
};

export default SearchForm;
