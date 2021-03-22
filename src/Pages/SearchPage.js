import React, { Component } from 'react'
import DataTable from '../Components/DataTable'
import { withRouter } from "react-router";
import * as URI from '../Library/URIs'

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedItems: [],
            itemCount: 0
        }
    }
    
    getData = () => {
        let repositoryName = this.props.match.params.repositoryName;
        const apiURI = URI.baseSearchApiURI.concat(repositoryName)
                                           .concat('&', URI.privateFalseURI)
                                           .concat('&', URI.limitPageToHundredURI);
        fetch(apiURI)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    itemCount: data.total_count,
                    searchedItems: data.items
                });
            });
    };
    componentDidUpdate(prevProps, prevState) {
        if(this.props.location !== prevProps.location){
            this.getData();
        }
    }
    componentDidMount(){
        this.getData();
    }

    render() {
        return (
            <div>
                <DataTable searchedItems={this.state.searchedItems}></DataTable>
            </div>
        )
    }
}

export default withRouter(SearchPage)