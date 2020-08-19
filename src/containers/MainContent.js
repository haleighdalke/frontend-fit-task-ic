import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import AccomplishmentsPopUp from './AccomplishmentsPopUp';
import ChartContainer from './ChartContainer';

class MainContent extends React.Component {
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
        <div>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <h1>Location: {user.location}</h1>
            <button onClick={() => {
                localStorage.clear()
                this.props.history.push('/')
                }}>Log Out</button>
            <Button variant="primary" onClick={this.setModalShow}>Add an Accomplishment</Button>
            <AccomplishmentsPopUp show={this.state.modalShow} onHide={this.setModalShow} goals={goals} habits={habits}/>
            <ChartContainer/>
        </div>
    )}
}

export default withRouter(MainContent)