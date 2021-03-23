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
            commitDates: [],
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

    countDateOccurrence(array, dateToBeSearched) {
        return array.reduce((total, currentDate) => (currentDate === dateToBeSearched ? total + 1 : total), 0);
    }

    removeDuplicateDates(dates) {
        return dates.filter((date, index) => dates.indexOf(date) === index);
    }

    addZeroToMonth(month) {
        return month < 10 ? ('0' + month) : month
    }

    reverseDate(date) {
        let splittedDate = date.split('/');
        return splittedDate[1].concat('/').concat(splittedDate[0])
    }

    async populateData() {
        let contributorsInfo = []
        let oneHundredCommits = await this.fetchOneHundredCommits();
        let contributors = await this.fetchContributors();
        for await (let contributor of contributors) {
            let contributorInfo = await this.fetchContributorInfo(contributor.login);
            let contributorCommitCount = oneHundredCommits.filter(commit => contributor.login === commit.author.login).length;
            contributorInfo.commitCount = contributorCommitCount;
            contributorsInfo.push(contributorInfo);
        }
        //Get Dates
        let commitDates = oneHundredCommits.map(repositoryCommit => new Date(repositoryCommit.commit.committer.date))
            .map(date => (date.getFullYear() + '/' + this.addZeroToMonth((date.getMonth() + 1))))
            .sort()
        let uniqueCommitDates = this.removeDuplicateDates(commitDates)
            .map(date => {
                return {
                    date: this.reverseDate(date),
                    count: this.countDateOccurrence(commitDates, date)
                }
            })
        this.setState({
            contributors: contributorsInfo,
            commitDates: uniqueCommitDates,
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
            <div id="data-container">

                <Loading visible={this.state.loadingIsVisible} />
                <div className="data-repository-container">
                <div className="repository-container">Timeline</div>
                    <div id="timeline-container">
                        <Row>
                            <Col span={1} />
                            <Col span={22}>
                                <Graph
                                    label='100 Latest Commits Timeline'
                                    labels={this.state.commitDates.map(commitDate => commitDate.date)}
                                    data={this.state.commitDates.map(commitDate => commitDate.count)}
                                    backgroundColor='#B7AC44'
                                    height={100}
                                    width={600}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="repository-container">{this.state.params.repositoryName} Contributors</div>
                    <Row>
                        <Col span={1} />
                        <Col span={11}>
                            <DataList repositoryName={this.state.params.repositoryName}
                                contributors={this.state.contributors}
                            />
                        </Col>
                        <Col span={11}>
                            <Graph repositoryName={this.state.params.repositoryName}
                                contributors={this.state.contributors}
                                label='Commits per User'
                                labels={this.state.contributors.map(contributor => contributor.name ? contributor.name : contributor.login)}
                                data={this.state.contributors.map(contributor => contributor.commitCount)}
                                backgroundColor='#B7AC44'
                                height={270}
                                width={450}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default withRouter(RepositoryInfoPage)