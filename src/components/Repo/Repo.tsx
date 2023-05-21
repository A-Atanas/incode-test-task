import { useState, useEffect } from "react";
import { GitHubIssue } from "../../types/types";
import RepoLinks from "../RepoLinks/RepoLinks";
import { List } from "antd";
import moment from "moment";
import "./Repo.css";

type Props = {
	issues: GitHubIssue[];
	url: string[];
	stars: number;
};

const Repo = (props: Props) => {
	const [newIssues, setNewIssues] = useState<GitHubIssue[]>([]);
	const [assignedIssues, setAssignedIssues] = useState<GitHubIssue[]>([]);
	const [closedIssues, setClosedIssues] = useState<GitHubIssue[]>([]);

	useEffect(() => {
		setNewIssues(
			props.issues.filter(issue => moment(issue.created_at).isSame(moment(), "day"))
		);
		setAssignedIssues(
			props.issues.filter(issue => issue.assignee != null || issue.assignees.length != 0)
		);
		setClosedIssues(props.issues.filter(issue => issue.state === "closed"));
	}, [props.issues]);

	const parseIssues = (issueTypes: GitHubIssue[][], listTitles: string[]): JSX.Element[] => {
		return issueTypes.map((type, index) => (
			<List
				header={<h1>{listTitles[index]}</h1>}
				itemLayout="vertical"
				dataSource={type}
				renderItem={({ comments, number, title, user: { login }, created_at }) => (
					<ul>
						<li>{title}</li>
						<li>{comments}</li>
						<li>{number}</li>
						<li>{login}</li>
						<li>{created_at}</li>
					</ul>
				)}
				rowKey={({ number }) => number}
				key={index}
			></List>
		));
	};

	return (
		<div>
			<RepoLinks urls={props.url} stars={props.stars}/>
			<div id="issues">
				{props.issues.length
					? parseIssues(
							[newIssues, assignedIssues, closedIssues],
							["Todo", "In progress", "Closed"]
						).map(issue => issue)
				: null}
			</div>
		</div>
	);
};

export default Repo;
