import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (query) {
    console.log(`${query} was searched`);

    $.ajax({
      url: '/repos',
      type: 'POST',
      data: JSON.stringify({username: query}),
      contentType: 'application/json',
      success: (data) => {
        console.log('AJAX repos were found and added to the database!');
      },
      error: (error) => {
        console.error('AJAX post failed: ', error);
      }
    });
  }

  displayRepos() {
    $.ajax({
      url: '/repos',
      type: 'GET',
      success: (data) => {
        this.setState({
          repos: JSON.parse(data)
        });
        console.log('AJAX repos retrieved!')
      },
      error: (err) => {
        console.error('AJAX post failed: ', err);
      }
    });
  }

  componentDidMount() {
    this.displayRepos();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));