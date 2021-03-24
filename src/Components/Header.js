import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Layout, Input, Row, Col } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const { Header } = Layout;
const { Search } = Input;

 class header extends Component {
    onSearch = (value) => {
        if (value) {
            this.props.history.push(`/search/${value}`);
        }
    }

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
                        <Col span={6}><Search placeholder="input search text" onSearch={this.onSearch} enterButton /> </Col>
                    </Row>
                </Header>
            </Layout>
        )
    }
}

export default withRouter(header)