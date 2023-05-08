import { useState } from "react";

type Props = {
	handleAPICall: (url: string) => void;
};

const SearchForm = (props: Props) => {
	const [url, setUrl] = useState("");

	return (
		<div>
			<input
				type="url"
				value={url}
				onChange={event => setUrl(event.target.value)}
			/>
			<button onClick={() => props.handleAPICall(url)}>Call GitHub API</button>
		</div>
	);
};

export default SearchForm;
