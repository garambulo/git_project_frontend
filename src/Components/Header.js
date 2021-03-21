import React, { Component } from 'react'
import { Input, Space } from 'antd';
import 'antd/dist/antd.css';

const { Search } = Input;


export default class header extends Component {
    render() {
        return (
            <header>
                <Space direction="vertical">
                    <Search
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={this.props.onSearch}
                    />
                </Space>
            </header>
        )
    }
}
