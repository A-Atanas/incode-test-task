import { GitHubIssue } from "../../types/types";
import RepoLinks from "../RepoLinks/RepoLinks";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { swapIssues } from "../../redux/issues";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import "./Repo.css";
import { List } from "antd";
import moment from "moment";

const Repo = () => {
	const repoData = useAppSelector((state) => state.repo);
	const dispatch = useAppDispatch();

	const parseIssues = (issueTypes: GitHubIssue[][], listTitles: string[]): JSX.Element[] => {
		if (issueTypes.length !== listTitles.length) return [];
		return issueTypes.map((type, listIndex) => (
			<Droppable droppableId={`${listIndex}-droppable`} key={listIndex}>
				{(droppableProvided) => (
					<div 
						ref={droppableProvided.innerRef}
						{...droppableProvided.droppableProps}
					>
						<List
							header={<h1>{listTitles[listIndex]}</h1>}
							itemLayout="vertical"
							dataSource={type}
							renderItem={({ comments, number, title, user: { login }, created_at }, itemIndex) => (
								<Draggable draggableId={`${number}-droppable_list-${listIndex}`} index={itemIndex}>
									{(draggableProvided) => (
											<List.Item
												{...draggableProvided.draggableProps}
												{...draggableProvided.dragHandleProps}
												ref={draggableProvided.innerRef}
											>
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
								</Draggable>
							)}
							rowKey={({ number }) => number}
							key={listIndex}
							bordered
						>
							{droppableProvided.placeholder}
						</List>
					</div>
				)}
			</Droppable>
		));
	};

	const dropIssue = ({source, destination}: DropResult) => {
		if (!destination) return;
		if (destination.droppableId === source.droppableId) {
			if (destination.index === source.index) return;
			const column = [...repoData.issues[parseInt(source.droppableId)]];
			const draggedItem = column.splice(source.index, 1)[0];
			column.splice(destination.index, 0, draggedItem);
	
			dispatch(swapIssues({
				columnFromNumber: parseInt(destination.droppableId), 
				columnFrom: column,
				columnToNumber: parseInt(destination.droppableId), 
				columnTo: column,
			}));
			return;
		}

		const start = [...repoData.issues[parseInt(source.droppableId)]];
		const finish = [...repoData.issues[parseInt(destination.droppableId)]];
		const draggedItem = start.splice(source.index, 1)[0];
		finish.splice(destination.index, 0, draggedItem);
		dispatch(swapIssues({
			columnFromNumber: parseInt(source.droppableId), 
			columnFrom: start,
			columnToNumber: parseInt(destination.droppableId), 
			columnTo: finish,
		}))
	}

	const repoHasIssues: boolean = repoData.issues.some((array) => array.length !== 0)

	return (
		<div>
			<RepoLinks urlParts={repoData.urlParts} stars={repoData.repoStars}/>
			<DragDropContext onDragEnd={dropIssue}>
				<div id="issues">
					{repoHasIssues
						? parseIssues(
								repoData.issues,
								["Todo", "In progress", "Closed"]
							).map(issue => issue)
					: null}
				</div>
			</DragDropContext>
		</div>
	);
};

export default Repo;
