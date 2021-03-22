import React, { Component } from 'react'
import { withRouter } from "react-router";
import DataList from '../Components/DataList'
import * as URI from '../Library/URIs'


class RepositoryInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contributors: [],
            params : this.props.match.params
        }
    }

    getContributors = () => {
        const apiURI = URI.baseRepositoryInfoURI.concat(this.state.params.creatorName)
                                                .concat('/', this.state.params.repositoryName)
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
                <DataList repositoryName={this.state.params.repositoryName} contributors={this.state.contributors} />
            </div>
        )
    }
}

export default withRouter(RepositoryInfoPage)