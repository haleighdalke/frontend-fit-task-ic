import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class AddAccomplishmentForm extends React.Component {

    state = {
        date: null,
        goal_id: null,
        duration: null,
        duration_type: null
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        fetch('http://localhost:3000/accomplishments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(console.log)
    }

    renderGoals = () => {
        return this.props.goals.map(goal => {
            return <option key={goal.id} value={goal.id}>{`${this.setHabitActivity(goal.habit_id)} - ${goal.duration} ${goal.duration_type} ${goal.frequency}`}</option>
        })
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (e.target.name === "goal_id") {
            this.setDurationType(e.target.value)
        }
    }

    setDurationType = (id) => {
        this.props.goals.map(goal => {
            if (goal.id == id) {
                this.setState({ duration_type: goal.duration_type})
            }
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

    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control name='date' type="date" onChange={this.handleOnChange}/>
            </Form.Group>
            <Form.Group controlId="goal">
                <Form.Label>Select a Goal</Form.Label>
                <Form.Control as="select" name='goal_id' onChange={this.handleOnChange} defaultValue="choose">
                    <option disabled value="choose"> -- select an option -- </option>
                    {this.renderGoals()}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="duration">
                <Form.Label>Duration</Form.Label>
                <Form.Control name='duration' type="number" onChange={this.handleOnChange}/>
            </Form.Group>
            <Form.Group controlId="duration_type">
                <Form.Label>Duration Type</Form.Label>
                <Form.Control name='duration_type' onChange={this.handleOnChange} plaintext readOnly defaultValue={this.state.duration_type} />
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
            </Form>
        )
    }
}

export default AddAccomplishmentForm