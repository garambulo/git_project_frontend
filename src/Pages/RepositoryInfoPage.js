import React, { Component } from 'react'
import { withRouter } from "react-router";
import DataList from '../Components/DataList'
import * as URI from '../Library/URIs'


class RepositoryInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contributors: []
        }
    }

    getContributors = () => {
        let params = this.props.match.params;
        const apiURI = URI.baseRepositoryInfoURI.concat(params.creatorName)
                                                .concat('/', params.repositoryName)
                                                .concat(URI.contributorsURI);
        fetch(apiURI)
            .then((response) => response.json())
            .then((contributors) => {
                contributors.forEach(contributor => {
                    this.getContributorsInfo(contributor.login)
                });
            })
            .then();
    }

    getContributorsInfo = (contributor) =>{
        const apiURI = URI.baseURI.concat(URI.usersURI)
                                  .concat('/', contributor)

        fetch(apiURI).then((response) => response.json()
                     .then((contributorInfo)=>{
                        this.setState(prevState => ({
                            contributors: [...prevState.contributors, contributorInfo ]
                        }))
                     } ))
    }

    componentDidMount() {
        this.getContributors();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.location !== prevProps.location){
            this.getContributors();
        }
    }

    render() {
        return (
            <div>
                <DataList contributors={this.state.contributors} />
            </div>
        )
    }
}

export default withRouter(RepositoryInfoPage)