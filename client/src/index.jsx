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
    console.log(typeof query);

    const data = JSON.stringify({username: query});

    $.ajax({
      url: '/repos',
      type: 'POST',
      data: data,
      headers: {
        "Content-Type": "application/json"
      },
      // dataType: 'json',
      success: (data) => {
        console.log('AJAX SUCCESS repos were found and added to the database!');
      },
      error: (error) => {
        console.error('AJAX FAIL post failed: ', error);
      }
    });
  }

  getStarredRepos() {
    $.ajax({
      url: '/repos',
      type: 'GET',
      success: (data) => {
        console.log(data);
        console.log(typeof data);
        // var jsonArray = JSON.parse(data);
        this.setState({
          repos: data
        });
        console.log('AJAX repos retrieved!');
      },
      error: (err) => {
        console.error('AJAX post failed: ', err);
      }
    });
  }

  componentDidMount() {
    this.getStarredRepos();
  }

  render () {
    return (<div>
      <h1 id="main-title">Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));