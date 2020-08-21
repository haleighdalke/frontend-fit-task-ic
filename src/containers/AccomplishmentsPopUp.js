import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import AddAccomplishmentForm from '../components/AddAccomplishmentForm';
import ViewAccomplishments from '../components/ViewAccomplishments';

class AccomplishmentsPopUp extends React.Component {

    state = {
        goal: null,
    }

    renderGoals = () => {
        if (this.props.goals) {
        return this.props.goals.map(goal => {
            return <option key={goal.id} value={goal.id}>{`${goal.duration} ${goal.duration_type} of ${this.setHabitActivity(goal.habit_id)} - ${goal.frequency}x per week`}</option>
        })
        }
    }

    setHabitActivity = (id) => {
        let activity
        this.props.habits.forEach(habit => {
            if (habit.id.toString() === id.toString()) {
                activity = habit.activity
            }
        })
        return activity 
    }

    handleOnChange = (e) => {
        this.props.goals.map(goal => {
            if (goal.id.toString() === e.target.value) {
                this.setState({
                    goal: goal
                })
            }
        })
    }

    closeBox = () => {
        this.props.onHide()
        this.setState({ goal: null })
    }

    render(){
        let {goals, habits, accomplishments, addAccomplishment, show} = this.props
        return (
            <Modal className='my-modal' show={show} onHide={this.closeBox} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Tabs defaultActiveKey="add" id="uncontrolled-tab-example">
                    <Tab eventKey="add" title="Add New">
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                <div align={'center'}>Add an Accomplishment</div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddAccomplishmentForm goals={goals} habits={habits} addAccomplishment={addAccomplishment} onHide={this.closeBox}/>
                        </Modal.Body>
                    </Tab>
                    <Tab eventKey="view" title="View Progress">
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter" align={'center'}>
                                Select a Goal to View: 
                                <select className='goal-select' defaultValue="choose" onChange={this.handleOnChange}>
                                <option disabled value="choose"> -- select a goal -- </option>
                                {this.renderGoals()}
                                </select>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.goal ? <ViewAccomplishments goal={this.state.goal} accomplishments={accomplishments}/> : null}
                        </Modal.Body>
                    </Tab>
                </Tabs>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeBox}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AccomplishmentsPopUp