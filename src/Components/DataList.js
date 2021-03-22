import React, { Component } from 'react'
import { withRouter } from "react-router";
import { List, Avatar } from 'antd';
import 'antd/dist/antd.css';

class DataList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.props.contributors}
                header={<div>Contributors</div>}
                renderItem={contributor => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<p>{contributor.name ? contributor.name : contributor.login}</p>}
                            description={contributor.location}
                        />
                    </List.Item>
                )}
            />
        )
    }
}
export default withRouter(DataList)
