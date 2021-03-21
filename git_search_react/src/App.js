import './App.css';
import React, { Component } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import * as URI from './Library/URIs'
import DataTable from './Components/DataTable'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchedItems: [],
      itemCount: 0
    }
  }

  onSearch = (value) => {
    const apiURI = URI.baseSearchApiURI.concat(value, URI.privateFalseURI, URI.limitPageToHundredURI);
    if (value) {
      fetch(apiURI)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            itemCount: data.total_count,
            searchedItems: data.items
          });
        }
        );
    }
  };

  render() {
    return (
      <div className="App">
        <Header onSearch={this.onSearch}></Header>
        <DataTable searchedItems={this.state.searchedItems}></DataTable>
        <Footer></Footer>
      </div>
    );
  }
}

