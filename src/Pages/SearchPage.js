import React, { Component } from 'react'
import DataTable from '../Components/DataTable'
import { withRouter } from "react-router";
import * as URI from '../Library/URIs'
import Loading from '../Components/Loading'

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedItems: [],
            loadingIsVisible: true
        }
    }

    getData = () => {
        let repositoryName = this.props.match.params.repositoryName;
        // const apiURI = URI.baseSearchApiURI.concat(repositoryName)
        //     .concat('&', URI.privateFalseURI)
        //     .concat('&', URI.limitPageToHundredURI);
        const apiURI = URI.localhostBaseURI.concat(URI.searchURI)
            .concat('/', repositoryName);
        fetch(apiURI)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    searchedItems: data.items,
                    loadingIsVisible: false
                });
            });
    };
    
    componentDidUpdate(prevProps, prevState) {
        if (this.props.location !== prevProps.location) {
            this.getData();
        }
    }
    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div id="search-container">
                <Loading visible={this.state.loadingIsVisible} />
                <div className="data-search-container">
                    <DataTable searchedItems={this.state.searchedItems}></DataTable>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchPage)