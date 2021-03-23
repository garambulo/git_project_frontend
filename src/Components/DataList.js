import React, { Component } from 'react'
import { withRouter } from "react-router";
import { List } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';

class DataList extends Component {
    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.props.contributors}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                renderItem={contributor => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<UserOutlined />}
                            title={<p>{contributor.name ? contributor.name : contributor.login}</p>}
                            description={contributor.location ? contributor.location : 'No location indicated'}
                        />
                    </List.Item>
                )}
            />

        )
    }
}
export default withRouter(DataList)
