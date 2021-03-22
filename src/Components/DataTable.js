import React, { Component } from 'react'
import { Table, Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from "react-router";

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: 'Repository Name',
                    dataIndex: 'repository',
                    render: repository => <Button type = "link" onClick={this.onClick} >{repository}</Button>,
                    ellipsis:true,
                    width:250
                },
                {
                    title: 'Description',
                    dataIndex: 'description',
                    ellipsis:true,
                    width:250
                }
            ],
            data: [ ]
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchedItems !== this.props.searchedItems) {
            this.populateData();
        }
    }

    populateData = () => {
        this.setState({
            data: []
        })

        this.props.searchedItems.forEach(searchedItem => {
            let item = {
                key: searchedItem.id,
                repository: searchedItem.full_name,
                description: searchedItem.description
            }
            this.setState(prevState => ({
                data: [...prevState.data, item]
            }))
        });
    }

    onClick = e =>{
        let repositoryName = e.target.innerText;
        this.props.history.push(`/repository/${repositoryName}`)
    }

    render() {
        return (
            <div>
                <h2 className="table-header">Repository List</h2>
                <Row justify="center">
                    
                    <Col span={20}>
                    <Table
                        columns={this.state.columns}
                        dataSource={this.state.data}
                        bordered
                    />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(DataTable);