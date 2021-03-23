import React, { Component } from 'react'
import { Spin } from 'antd';
import 'antd/dist/antd.css';

export default class Loading extends Component {
    render() {
        if (this.props.visible) {
            return (
                <div>
                    <Spin tip="Loading...">
                    </Spin>
                </div>
            )
        } else {
            return (
                <div>
                </div>
            )
        }
    }
}
