import React from 'react';

class RepoListEntry extends React.Component {
  constructor(props) {
  	super(props);
  }

  render() {
  	return (
  	  <div>
  	  	<li className="repo">
  	  	  Name: {this.props.repo.name}
  	  	  User: {this.props.repo.user}
  	  	  URL: {this.props.repo.html_url}
  	  	  Description: {this.props.repo.description}
  	  	  Stargazers: {this.props.repo.stargazers}
  	  	</li>
  	  </div>
  	);
  }
}

export default RepoListEntry;