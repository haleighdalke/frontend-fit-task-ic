import React from 'react';
import { withRouter } from 'react-router-dom';

class MainContent extends React.Component {
  
    render(){
    let {user, token, goals} = this.props
    return(
        <div>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <h1>Location: {user.location}</h1>
            <button onClick={() => {
                localStorage.clear()
                this.props.history.push('/')
                }}>Log Out</button>
        </div>
    )}
}

export default withRouter(MainContent)