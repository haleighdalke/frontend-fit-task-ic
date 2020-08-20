import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import logo from '../assets/img/fit-task-ic-logo6.png'
import AccomplishmentsPopUp from './AccomplishmentsPopUp'
import HabitContainer from './HabitContainer';
import { UncontrolledCollapse, CardBody, Card } from 'reactstrap';
import GoalContainer from './GoalContainer'

class NavbarContainer extends React.Component {
    state = {
        modalShow: false
    }

    setModalShow = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }

    // RENDER METHODS
    renderLogo = () => {
        return (
            <div className="logo">
                <img src={logo} alt="Fit-task-ic" />
            </div>
        )
    }

    renderUserInfo = (user) => {
        return (
            <div className="user-info">
                <h3>- {user.name} | {user.age} | {user.location} -</h3>
            </div>
        )
    }

    renderSidenavOptions = (habits, addHabit, updateHabit, goals, addGoal, updateGoal, accomplishments, addAccomplishment) => {
        console.log()
        return (
            <div className="sidenav-options">
                <a href="#" id="habit-manager-toggler">Habit Manager</a>
                {this.renderHabitManager(habits, addHabit, updateHabit)}
                <a href="#" id="goals-manager-toggler">Goals Manager</a>
                {this.renderGoalsManager(goals, addGoal, updateGoal)}
                <a href="#" onClick={this.setModalShow}>Accomplishment Manager</a>
                <AccomplishmentsPopUp 
                    show={this.state.modalShow} 
                    onHide={this.setModalShow} 
                    goals={goals} 
                    habits={habits} 
                    accomplishments={accomplishments}
                    addAccomplishment={addAccomplishment}/>
            </div>
        )
    }

    renderHabitManager = (habits, addHabit, updateHabit) => {
        return (
            <UncontrolledCollapse toggler="#habit-manager-toggler" >
                <br></br>
                <Card className="sidenav-option-manager">
                    <HabitContainer habits={habits} addHabit={addHabit} updateHabit={updateHabit}/>
                </Card>
                <br></br>
            </UncontrolledCollapse>
        )
    }

    renderGoalsManager = (goals, addGoal, updateGoal) => {
        return (
            <UncontrolledCollapse toggler="#goals-manager-toggler" >
                <br></br>
                <Card className="sidenav-option-manager">
                    <GoalContainer goals={goals} addGoal={addGoal} updateGoal={updateGoal}/>
                </Card>
                <br></br>
            </UncontrolledCollapse>
        )
    }

    renderLogout = () => {
        return (
            <Button onClick={() => {
                localStorage.clear()
                this.props.history.push('/')
                }}>Log Out
            </Button>
        )
    }
  
    render(){
        let {user, token, goals, habits, addHabit, updateHabit, addGoal, updateGoal, accomplishments, addAccomplishment} = this.props
        return(
            <div className="sidenav-container">
                {this.renderLogo()}
                {this.renderUserInfo(user)}
                {this.renderSidenavOptions(habits, addHabit, updateHabit, goals, addGoal, updateGoal, accomplishments, addAccomplishment)}
                <br></br>
                {this.renderLogout()}
            </div>
        )}
    }

export default withRouter(NavbarContainer)