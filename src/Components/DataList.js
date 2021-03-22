import React, { Component } from 'react'
import { withRouter } from "react-router";
import { List, Avatar } from 'antd';
import 'antd/dist/antd.css';

class DataList extends Component {

    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.props.contributors}
                header={<div>{this.props.repositoryName} Contributors</div>}
                renderItem={contributor => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<p>{contributor.name ? contributor.name : contributor.login }</p>}
                            description={contributor.location ? contributor.location : 'No location indicated'}
                        />
                    </List.Item>
                )}
            />
        )
    }
}
export default withRouter(DataList)
