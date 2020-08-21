import React, { Component } from 'react';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

export default class GoalContainer extends Component {
    state = {
        id: null, 
        frequency: null,
        duration: null,
        duration_type: "min",
        habit_id: null,
        goalAdd: true,
        deleteButton: false
    }

    handleSubmit = (e, habits, addGoal, updateGoal, deleteGoal) => {
        e.preventDefault()
        let {frequency, duration, duration_type, habit_id} = this.state
        if(frequency !== null && duration !== null && habit_id !== null){
            let goal = {
                frequency: parseInt(frequency),
                duration: parseInt(duration),
                duration_type: duration_type,
                habit_id: parseInt(habit_id),
                user_id: parseInt(this.props.user.id)
            }
            // persist to database
            if(this.state.goalAdd){
                addGoal(goal)
            } else if(!this.state.goalAdd && e.target.name === "submit"){
                updateGoal(this.state.id, goal)
            } else {
                deleteGoal(this.state.id, goal)
            }
            // reset state
            this.setState({
                id: null, 
                frequency: null,
                duration: null,
                habit_id: null,
                goalAdd: true,
                deleteButton: false
            })
            e.target.parentElement.reset()
        }
        else{
            alert("Must include duration, frequency, and habit to create a new goal.")
        }
    }

    // autofill form (update)
    autoFillForm = (selectedValue, goals) => {
        if(selectedValue === "n/a"){
            this.setState({
                id: null, 
                frequency: null,
                duration: null,
                habit_id: null,
                goalAdd: true,
                deleteButton: false
            })
        }else{
            // handle updating and render delete button

            let foundGoal = goals.find(goal => goal.id === parseInt(selectedValue))
            this.setState({
                id: foundGoal.id, 
                frequency: foundGoal.frequency,
                duration: foundGoal.duration,
                habit_id: foundGoal.habit_id,
                goalAdd: false,
                deleteButton: true
            })
        }
    }

    // controlled form (add and update)
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleHabitDropdownChange = (e) => {
        if(e.target.value !== "n/a"){
            this.setState({habit_id: parseInt(e.target.value)})
        }
    }

    generateHabitDropdownOptions = (habits) => {
        return habits.map(habit => {
            if(habit.id === this.state.habit_id){
                return <option id={habit.id} key={habit.id} value={habit.id} selected>{habit.activity}</option>
            }
            else{
                return <option id={habit.id} key={habit.id} value={habit.id}>{habit.activity}</option>
            }
        })
    }

    generateGoalDropdownOptions = (habits, goals) => {
        return goals.map(goal => {
            if(habits){
                let habit = habits.find(habit => habit.id === goal.habit_id)
                if(habit){
                    return <option id={goal.id} key={goal.id} value={goal.id}>{habit.activity} for {goal.duration} min {goal.frequency} times per week</option>
                }
            }
        })
    }

    render() {
        let {habits, goals, addGoal, updateGoal, deleteGoal} = this.props
        return (
            <CardBody>
                <Form>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                {/* <Label for="duration">New Duration:</Label> */}
                                <Input type="number" name="duration" id="duration" placeholder="Duration" value={this.state.duration ? this.state.duration : ""} onChange={this.handleOnChange}/>min
                            </FormGroup>
                        </Col>
                        <Col md={8}>
                            <FormGroup>
                                {/* <Label for="frequency">New Frequency:</Label> */}
                                <Input type="number" name="frequency" id="frequency" placeholder="Frequency (per week)" value={this.state.frequency ? this.state.frequency : ""} onChange={this.handleOnChange}/>per week
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <FormGroup onChange={this.handleHabitDropdownChange}>
                        {/* <Label for="edit-goal"></Label> */}
                            <Input type="select" name="select" id="edit-goal">
                                <option value={"n/a"}>--select a habit--</option>
                                {habits ? this.generateHabitDropdownOptions(habits) : false}
                            </Input>
                    </FormGroup>

                    <FormGroup onChange={(e) => this.autoFillForm(e.target.value, goals)}>
                        <Label for="edit-goal">(optional) edit a goal</Label>
                            <Input type="select" name="select" id="edit-goal">
                                <option value={"n/a"}>n/a</option>
                                {goals ? this.generateGoalDropdownOptions(habits, goals) : false}
                            </Input>
                    </FormGroup>
                    
                    <Button name="submit" className="goals-submit" onClick={(e) => this.handleSubmit(e, habits, addGoal, updateGoal, deleteGoal)}>Submit</Button>
                    {this.state.deleteButton ? <Button name="delete" className="goals-submit" onClick={(e) => this.handleSubmit(e, habits, addGoal, updateGoal, deleteGoal)}>Delete</Button> : false}
            </Form>
            </CardBody>
        );
    }
}