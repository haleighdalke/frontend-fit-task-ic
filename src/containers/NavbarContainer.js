import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import logo from '../assets/img/fit-task-ic-logo6.png'
import AccomplishmentsPopUp from './AccomplishmentsPopUp'
import HabitContainer from './HabitContainer';
import { UncontrolledCollapse, CardBody, Card } from 'reactstrap';
import GoalContainer from './GoalContainer'
import Goal from '../components/Goal';

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
            <div className="sidenav-container">
                <div className="logo">
                    <img src={logo} alt="Fit-task-ic" />
                </div>
                <div className="user-info">
                    <h3>- {user.name} | {user.age} | {user.location} -</h3>
                </div>
                <div className="sidenav-options">
                    <a href="#" id="habit-manager-toggler" onClick={this.handleDisplayHabits}>Habit Manager</a>
                    <UncontrolledCollapse toggler="#habit-manager-toggler" >
                        <br></br>
                        <Card className="sidenav-option-manager">
                            <HabitContainer />
                        </Card>
                        <br></br>
                  </UncontrolledCollapse>
                    <a href="#" id="goals-manager-toggler">Goals Manager</a>
                    <UncontrolledCollapse toggler="#goals-manager-toggler" >
                        <br></br>
                        <Card className="sidenav-option-manager">
                            <GoalContainer />
                        </Card>
                        <br></br>
                  </UncontrolledCollapse>
                    <a href="#" onClick={this.setModalShow}>Accomplishment Manager</a>
                </div>
                <AccomplishmentsPopUp show={this.state.modalShow} onHide={this.setModalShow} goals={goals} habits={habits}/>

                <br></br>
                <Button onClick={() => {
                    localStorage.clear()
                    this.props.history.push('/')
                    }}>Log Out
                </Button>
            </div>
        )}
    }

export default withRouter(NavbarContainer)