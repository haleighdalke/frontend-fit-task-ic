import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

class NavbarContainer extends React.Component {
  
    render(){
        return(
            <Container>
                <ul>
                    <li>Main Content</li>
                    <li>Habit Handler</li>
                    <li>Goals Handler</li>
                </ul>
            </Container>
        )}
    }

export default withRouter(NavbarContainer)