import React, { Component } from 'react'
import { withRouter } from "react-router";

class HomePage extends Component {
    render() {
        return (
            <div>
                <p>This is the home page</p>
            </div>
        )
    }
}

export default withRouter(HomePage)