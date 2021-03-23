import React, { Component } from 'react'
import { withRouter } from "react-router";
import { Bar } from 'react-chartjs-2';

import 'antd/dist/antd.css';

class Graph extends Component {
    render() {
        return (
            <Bar
                data={
                    {
                        labels: this.props.labels,
                        datasets: [{
                            label: this.props.label,
                            data: this.props.data,
                            backgroundColor: this.props.backgroundColor
                        }]
                    }}
                height={this.props.height}
                width={this.props.width}
            />
        )
    }
}
export default withRouter(Graph)
