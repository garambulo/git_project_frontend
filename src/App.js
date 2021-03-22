import './App.css';
import React, { Component } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import HomePage from './Pages/HomePage'
import SearchPage from './Pages/SearchPage'
import RepositoryInfoPage from './Pages/RepositoryInfoPage'
import { Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router";

class App extends Component {

  onSearch = (value) => {
    if (value) {
        this.props.history.push(`/search/${value}`);
    }
  };

  render() {
    return (
      <div className="App">
        <Header onSearch={this.onSearch}></Header>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/search/:repositoryName" component={SearchPage} />
          <Route path="/repository/:creatorName/:repositoryName" component={RepositoryInfoPage} />
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(App)
