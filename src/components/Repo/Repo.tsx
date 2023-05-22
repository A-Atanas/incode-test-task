import { GitHubIssue } from "../../types/types";
import RepoLinks from "../RepoLinks/RepoLinks";
import { List } from "antd";
import moment from "moment";
import "./Repo.css";

type Props = {
	issues: GitHubIssue[];
	urlParts: string[];
	stars: number;
};

const Repo = (props: Props) => {
	const parseIssues = (issueTypes: GitHubIssue[][], listTitles: string[]): JSX.Element[] => {
		return issueTypes.map((type, index) => (
			<List
				header={<h1>{listTitles[index]}</h1>}
				itemLayout="vertical"
				dataSource={type}
				renderItem={({ comments, number, title, user: { login }, created_at }) => (
					<List.Item>
						<div className="issue">
							<h3>{title}</h3>
							<div>
								<p>#{number}</p>
								<p>Opened {moment(created_at).fromNow()}</p>
							</div>
							<div>
								<p>{login}</p>
								<p>|</p>
								<p>Comments: {comments}</p>
							</div>
						</div>
					</List.Item>
				)}
				rowKey={({ number }) => number}
				key={index}
				bordered
			></List>
		));
	};

	return (
		<div>
			<RepoLinks urlParts={props.urlParts} stars={props.stars}/>
			<div id="issues">
				{props.issues.length
					? parseIssues(
							[
								props.issues.filter(issue => moment(issue.created_at).isSame(moment(), "day")), 
								props.issues.filter(issue => issue.assignee != null || issue.assignees.length != 0), 
								props.issues.filter(issue => issue.state === "closed")
							],
							["Todo", "In progress", "Closed"]
						).map(issue => issue)
				: null}
			</div>
		</div>
	);
};

export default Repo;
