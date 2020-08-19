import React from 'react';
import { withRouter } from 'react-router-dom';
import ChartContainer from './ChartContainer';
import NavbarContainer from './NavbarContainer'; 
import {Container} from 'reactstrap'

class MainContent extends React.Component {
  
    render(){
    let {user, token, goals} = this.props
    return(
        <Container className="main-content">
            <NavbarContainer user={user} token={token} goals={goals}/>
            <ChartContainer/>
        </Container>
    )}
}

export default withRouter(MainContent)