import React from 'react';
import { withRouter } from 'react-router-dom';
import ChartContainer from './ChartContainer';
import NavbarContainer from './NavbarContainer'; 
import {Container, Row, Col} from 'reactstrap'

class MainContent extends React.Component {
  
    render(){
    let {user, token, goals} = this.props
    return(
        <Container>
              <Row>
                <Col sm={4}>
                  <NavbarContainer />
                </Col>
                <Col sm={8}> 
                    <div>
                        <h1>Name: {user.name}</h1>
                        <h1>Age: {user.age}</h1>
                        <h1>Location: {user.location}</h1>
                        <button onClick={() => {
                            localStorage.clear()
                            this.props.history.push('/')
                            }}>Log Out</button>
                    </div>
                    <ChartContainer/>
                </Col>
            </Row>
        </Container>
    )}
}

export default withRouter(MainContent)