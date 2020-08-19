import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import AddAccomplishmentForm from '../components/AddAccomplishmentForm';
import ViewAccomplishments from '../components/ViewAccomplishments';

class AccomplishmentsPopUp extends React.Component {

    renderGoals = () => {
        return this.props.goals.map(goal => {
            return <option key={goal.id} value={goal.id}>{`${this.setHabitActivity(goal.habit_id)} - ${goal.duration} ${goal.duration_type} ${goal.frequency}`}</option>
        })
    }

    setHabitActivity = (id) => {
        let activity
        this.props.habits.map(habit => {
            if (habit.id == id) {
                activity = habit.activity
            }
        })
        return activity 
    }

    handleOnChange = (e) => {
        console.log(e.target.value)
    }

    render(){
        return (
            <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Tabs defaultActiveKey="add" id="uncontrolled-tab-example">
                    <Tab eventKey="add" title="Add New">
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add an Accomplishment
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddAccomplishmentForm goals={this.props.goals} habits={this.props.habits}/>
                        </Modal.Body>
                    </Tab>
                    <Tab eventKey="view" title="View Progress">
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                View Goal Progress
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ViewAccomplishments goals={this.props.goals} habits={this.props.habits}/>
                        </Modal.Body>
                    </Tab>
                    <Tab eventKey="contact" title="Contact" disabled>
                        <h3>Testing</h3>
                    </Tab>
                </Tabs>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AccomplishmentsPopUp