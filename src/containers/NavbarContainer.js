import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import logo from '../assets/img/fit-task-ic-logo6.png'
import AccomplishmentsPopUp from './AccomplishmentsPopUp'
import HabitContainer from './HabitContainer';

class NavbarContainer extends React.Component {
    state = {
        modalShow: false
    }

    setModalShow = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }
  
    render(){
        let {user, token, goals, habits} = this.props
        return(
            <Container className="sidenav-container">
                <div className="logo">
                    <img src={logo} alt="Fit-task-ic" />
                </div>
                <div className="user-info">
                    <h2>- {user.name} | {user.age} | {user.location} -</h2>
                </div>
                <div className="sidenav-options">
                    <a href="#" >Main Content</a>
                    <a href="#" >Habit Handler</a>
                    <a href="#" >Goals Handler</a>
                </div>
                <br></br>
                <Button variant="primary" onClick={this.setModalShow}>Add an Accomplishment</Button>
                <AccomplishmentsPopUp show={this.state.modalShow} onHide={this.setModalShow} goals={goals} habits={habits}/>
                <br></br>
                <Button onClick={() => {
                    localStorage.clear()
                    this.props.history.push('/')
                    }}>Log Out</Button>

                {/* <HabitContainer /> */}
            </Container>
        )}
    }

export default withRouter(NavbarContainer)