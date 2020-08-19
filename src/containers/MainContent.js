import React from 'react';
import { withRouter } from 'react-router-dom';
import ChartContainer from './ChartContainer';
import NavbarContainer from './NavbarContainer'; 
import {Container} from 'reactstrap'

class MainContent extends React.Component {

    render(){
    let {user, token, goals, habits} = this.props
    return(
        <Container className="main-content">
            <NavbarContainer user={user} token={token} goals={goals} habits={habits}/>
            <ChartContainer/>
        </Container>
    )}
}

export default withRouter(MainContent)