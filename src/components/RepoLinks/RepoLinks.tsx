import "./RepoLinks.css";
import {StarTwoTone} from "@ant-design/icons";

type Props = {
    urls: string[];
	stars: number;
}

const RepoLinks = ({urls, stars}: Props) => {

	const parseRepoLinks = (urls: string[]): JSX.Element[] => {
		let result: JSX.Element[] = [];
		let intermediateLink = "";
		urls.reduce((accumulator: JSX.Element[], current) => {
			accumulator.push(<a key={current} href={`https://github.com/${intermediateLink + current}`}>{current}</a>)
			intermediateLink += `${current}/`
			accumulator.push(<p>&gt;</p>)
			return accumulator;
		}, result);
		result.pop();
		return result;
	}

  return (
    <div id="repoLinks">
        {parseRepoLinks(urls)}
		{stars ? <p><StarTwoTone twoToneColor="#fc6f03"/> {stars} stars</p> : null}
    </div>
  )
}

export default RepoLinks;