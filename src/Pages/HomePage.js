import React, { Component } from 'react'
import { withRouter } from "react-router";
import DataTable from '../Components/DataTable'

class HomePage extends Component {
    render() {
        return (
            <div>
                <DataTable />
            </div>
        )
    }
}

export default withRouter(HomePage)