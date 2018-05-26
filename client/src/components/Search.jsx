import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  onChange (e) {
    this.setState({
      query: e.target.value
    });
  }

  search(event) {
    console.log('show query: ', this.state.query);
    event.preventDefault();
    this.props.onSearch(this.state.query);
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.query} onChange={this.onChange.bind(this)}/>       
      <button id="btn" onClick={this.search.bind(this)}> Add Repos </button>
    </div>) 
  }
}

export default Search;