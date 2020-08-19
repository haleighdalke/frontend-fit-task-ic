import React from 'react';
import { withRouter } from 'react-router-dom';
import ChartContainer from './ChartContainer';
import NavbarContainer from './NavbarContainer'; 
import {Container} from 'reactstrap'

class MainContent extends React.Component {

    render(){
    let {user, token, goals, habits} = this.props
    return(
        <div className="container-fluid" className="main-content">
            <ChartContainer/>
            <NavbarContainer user={user} token={token} goals={goals} habits={habits}/>
            
        </div>
    )}
}

export default withRouter(MainContent)