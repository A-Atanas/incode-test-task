import { useState, useEffect } from "react";
import moment from "moment";
import { GitHubIssue } from "../types/types";

type Props = {
	issues: GitHubIssue[];
};

const Issues = (props: Props) => {
	const [newIssues, setNewIssues] = useState<GitHubIssue[]>([]);
	const [assignedIssues, setAssignedIssues] = useState<GitHubIssue[]>([]);
	const [closedIssues, setClosedIssues] = useState<GitHubIssue[]>([]);

	useEffect(() => {
		setNewIssues(props.issues.filter(issue => moment(issue.created_at).isSame(moment(), "day")));
		setAssignedIssues(
			props.issues.filter(issue => issue.assignee != null || issue.assignees.length != 0)
		);
		setClosedIssues(
			props.issues.filter(issue => issue.state === "closed")
		);
	}, [props.issues]);

	const parseIssues = (issueTypes: GitHubIssue[][], listTitles: string[]): JSX.Element[] => {
		return issueTypes.map((type, index) => (
			<>
				<h1>{listTitles[index]}</h1>
				{type.map(({ comments, number, title, user: { login }, created_at }) => (
					<ul key={number}>
						<li>{title}</li>
						<li>{comments}</li>
						<li>{number}</li>
						<li>{login}</li>
						<li>{created_at}</li>
					</ul>
				))}
			</>
		));
	}

	return (
		<>
			{props.issues.length ? parseIssues([newIssues, assignedIssues, closedIssues], ["Todo", "In progress", "Closed"]).map(
				issue => issue
			) : null}
		</>
	);
};

export default Issues;
