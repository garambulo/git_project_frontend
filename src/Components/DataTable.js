import React, { Component } from 'react'
import { Table } from 'antd';
import 'antd/dist/antd.css';

export default class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: 'Repository Name',
                    dataIndex: 'repository',
                },
                {
                    title: 'Description',
                    dataIndex: 'description',
                    render: description => <p>{description}</p>,
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

    render() {
        return (
            <div>
                <Table
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    bordered
                    title={() => 'Repository List'}
                />
            </div>
        )
    }
}
