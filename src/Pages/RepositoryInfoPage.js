import React, { Component } from 'react'
import { withRouter } from "react-router";
import DataList from '../Components/DataList'
import * as URI from '../Library/URIs'


class RepositoryInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contributors: [],
            params: this.props.match.params,
            commits: []
        }
    }
    async fetchContributors(){
        const apiURI = URI.baseRepositoryInfoURI.concat('/', this.state.params.creatorName)
                                                .concat('/', this.state.params.repositoryName)
                                                .concat(URI.contributorsURI);
        return await fetch(apiURI).then((response) => response.json());
    }

    async fetchContributorInfo(contributor){
        const apiURI = URI.baseURI.concat(URI.usersURI)
                                  .concat('/', contributor);
        return await fetch(apiURI).then((response) => response.json());
    }

    async fetchOneHundredCommits(){
        const apiURI = URI.baseRepositoryInfoURI.concat('/', this.state.params.creatorName)
                                                .concat('/', this.state.params.repositoryName)
                                                .concat(URI.commitsURI);
                                                .concat('?',URI.limitPageToHundredURI);
        return await fetch(apiURI).then((response) => response.json());
    }

    async populateData(){
        let contributorsInfo = []
        let oneHundredCommits = await this.fetchOneHundredCommits();
        let contributors = await this.fetchContributors();
        for await (let contributor of contributors){
            let contributorInfo = await this.fetchContributorInfo(contributor.login);
            let contributorCommitCount = oneHundredCommits.filter(commit => contributor.login === commit.author.login).length;
            contributorInfo.commitCount = contributorCommitCount;
            contributorsInfo.push(contributorInfo);
        }

        this.setState({
            contributors : contributorsInfo,
            commits: oneHundredCommits
        })
    }

    componentDidMount() {
        this.populateData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.location !== prevProps.location) {
            this.populateData();
        }
    }

    render() {
        return (
            <div>
                <DataList repositoryName={this.state.params.repositoryName}
                    contributors={this.state.contributors}
                    commits={this.state.commits}
                    />
            </div>
        )
    }
}

export default withRouter(RepositoryInfoPage)