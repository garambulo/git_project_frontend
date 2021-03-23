import React, { Component } from 'react'
import { withRouter } from "react-router";
import { Row, Col } from 'antd';
import DataList from '../Components/DataList'
import Graph from '../Components/Graph'
import * as URI from '../Library/URIs'
import Loading from '../Components/Loading'


class RepositoryInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contributors: [],
            params: this.props.match.params,
            commits: [],
            loadingIsVisible: true
        }
    }
    async fetchContributors() {
        const apiURI = URI.baseRepositoryInfoURI.concat('/', this.state.params.creatorName)
            .concat('/', this.state.params.repositoryName)
            .concat(URI.contributorsURI);
        return await fetch(apiURI).then((response) => response.json());
    }

    async fetchContributorInfo(contributor) {
        const apiURI = URI.baseURI.concat(URI.usersURI)
            .concat('/', contributor);
        return await fetch(apiURI).then((response) => response.json());
    }

    async fetchOneHundredCommits() {
        const apiURI = URI.baseRepositoryInfoURI.concat('/', this.state.params.creatorName)
            .concat('/', this.state.params.repositoryName)
            .concat(URI.commitsURI)
            .concat('?', URI.limitPageToHundredURI);
        return await fetch(apiURI).then((response) => response.json());
    }

    async populateData() {
        let contributorsInfo = []
        let oneHundredCommits = await this.fetchOneHundredCommits();
        let contributors = await this.fetchContributors();
        console.log(contributors)
        for await (let contributor of contributors) {
            let contributorInfo = await this.fetchContributorInfo(contributor.login);
            let contributorCommitCount = oneHundredCommits.filter(commit => contributor.login === commit.author.login).length;
            contributorInfo.commitCount = contributorCommitCount;
            contributorsInfo.push(contributorInfo);
        }
        this.setState({
            contributors: contributorsInfo,
            commits: oneHundredCommits,
            loadingIsVisible: false
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
            <div id="dataContainer">
                
                <Loading visible={this.state.loadingIsVisible} />
                <div className="repositoryContainer">{this.props.repositoryName} Contributors</div>
                <Row>
                    <Col span={12}>
                        <DataList repositoryName={this.state.params.repositoryName}
                            contributors={this.state.contributors}
                            commits={this.state.commits}
                        />
                    </Col>
                    <Col span={12}>
                        <Graph repositoryName={this.state.params.repositoryName}
                            contributors={this.state.contributors}
                            commits={this.state.commits}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(RepositoryInfoPage)