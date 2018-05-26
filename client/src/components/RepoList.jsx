import React from 'react';
// import RepoListEntry from './RepoListEntry.jsx'

const RepoList = (props) => (
  <div>
    <h2 id="repo-title">Repos with the Most Stargazers</h2>
    <table className="repoList">
      <thead>
      	<tr id="header-columns">
      	  <th>Name</th>
      	  <th>User</th>
      	  <th>URL</th>
      	  <th>Number of Stargazers</th>
      	</tr>
      </thead>
      <tbody>
      	  {props.repos.map((repo, i) => 
      	  	<tr id="repo-columns">
              <td>{repo.name}</td>
  	          <td>{repo.user}</td>
  	          <td>{repo.html_url}</td>
  	          <td>{repo.stargazers}</td>
            </tr>
          )} 
      </tbody>
    </table>
  </div>
)

export default RepoList;