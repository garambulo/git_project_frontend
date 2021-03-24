import './App.css';
import React, { Component } from 'react'
import Header from './Components/Header'
import HomePage from './Pages/HomePage'
import SearchPage from './Pages/SearchPage'
import RepositoryInfoPage from './Pages/RepositoryInfoPage'
import { Route, Switch } from 'react-router-dom';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/search/:repositoryName/:pageNumber?" component={SearchPage} />
          <Route path="/repository/:creatorName/:repositoryName" component={RepositoryInfoPage} />
        </Switch>
      </div>
    );
  }
}