import { Breadcrumb } from "antd";
import "./RepoLinks.css";
import {StarTwoTone} from "@ant-design/icons";

type Props = {
    urlParts: string[];
	stars: number;
}

const RepoLinks = ({urlParts, stars}: Props) => {
  return (
    <div id="repoLinks">
        <Breadcrumb 
			items={urlParts.map((part, index, arr) => {
				return {
					title: (
						<a key={index} href={`https://github.com/${arr.slice(0, index + 1).join("/")}`}>
							{part}
						</a>
					)
				}
			})}
			separator={">"}
		/>
		{stars ? <p><StarTwoTone twoToneColor="#fc6f03"/> {stars} stars</p> : null}
    </div>
  )
}

export default RepoLinks;