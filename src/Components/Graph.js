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
                        labels: this.props.contributors.map(contributor => contributor.name ? contributor.name : contributor.login),
                        datasets: [{
                            label: 'No. Commits per User',
                            data: this.props.contributors.map(contributor => contributor.commitCount),
                            backgroundColor: this.props.contributors.map(contributor => '#F07C41')
                        }
                        ]
                    }}
                height={400}
                width={600}
            />
        )
    }
}
export default withRouter(Graph)
