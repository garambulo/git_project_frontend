import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Layout, Input, Row, Col } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Header } = Layout;
const { Search } = Input;

export default class header extends Component {
    render() {
        return (
            <Layout className="layout">
            <Header>
                <div className="logo" />
                    <Row>
                        <Col span={6}>
                            <GithubOutlined />
                            &nbsp;
                            <Link to="/">GitHub Project</Link>
                        </Col>
                        <Col span={6}> </Col>
                        <Col span={6}></Col>
                        <Col span={6}><Search placeholder="input search text" onSearch={this.props.onSearch} enterButton /> </Col>
                    </Row>
            </Header>
        </Layout>
        )
    }
}
