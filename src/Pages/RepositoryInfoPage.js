import React, { Component } from 'react'
import { withRouter } from "react-router";

class RepositoryInfoPage extends Component {
    render() {
        return (
            <div>
                <p>This is my repository Page</p>
            </div>
        )
    }
}

export default withRouter(RepositoryInfoPage)