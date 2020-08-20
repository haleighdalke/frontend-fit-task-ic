import React, { Component } from 'react';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

export default class GoalContainer extends Component {
    state = {
        id: null, 
        frequency: null,
        duration: null,
        duration_type: "min",
        habit_id: null,
        user_id: this.props.user_id,
        goalAdd: true
    }

    // controlled form (add and update)
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, habits, addGoal, updateGoal) => {
        e.preventDefault()
        let {frequency, duration, duration_type, habit_id, user_id} = this.state
        if(frequency !== null && duration !== null && habit_id !== null){
            let goal = {
                frequency: frequency,
                duration: duration,
                duration_type: duration_type,
                habit_id: habit_id,
                user_id: user_id
            }
            this.state.goalAdd ? addGoal(goal) : updateGoal(this.state.id, goal)
            this.setState({
                id: null, 
                frequency: null,
                duration: null,
                habit_id: null,
                goalAdd: true
            })
            e.target.reset()
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
                goalAdd: true
            })
        }else{
            let goal = goals.find(goal => goal.id == selectedValue)
            this.setState({
                id: null, 
                frequency: null,
                duration: null,
                habit_id: null,
                goalAdd: true
            })
        }
    }

    generateGoalDropdownOptions = (habits, goals) => {

        return goals.map(goal => {
            let habit = habits.find(habit => habit.id === goal.habit_id)
            if(habit){
                return <option id={goal.id} value={goal.id}>{habit.activity} for {goal.duration} min {goal.frequency} times per week</option>
            }
        })
    }

    handleHabitDropdownChange = (e) => {
        if(e.target.value !== "n/a"){
            this.setState({habit_id: parseInt(e.target.value)})
        }
    }

    generateHabitDropdownOptions = (habits) => {
        return habits.map(habit => {
            return <option id={habit.id} value={habit.id}>{habit.activity}</option>
        })
    }


    render() {
        let {habits, goals, addGoal, updateGoal} = this.props
        return (
            <CardBody>
                <Form onSubmit={(e) => this.handleSubmit(e, habits, addGoal, updateGoal)}>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                {/* <Label for="duration">New Duration:</Label> */}
                                <Input type="number" name="duration" id="duration" placeholder="Duration" value={this.state.duration} onChange={this.handleOnChange}/>min
                            </FormGroup>
                        </Col>
                        <Col md={8}>
                            <FormGroup>
                                {/* <Label for="frequency">New Frequency:</Label> */}
                                <Input type="number" name="frequency" id="frequency" placeholder="Frequency (per week)" value={this.state.frequency} onChange={this.handleOnChange}/>per week
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

                    <FormGroup onChange={this.handleGoalDropdownChange}>
                        <Label for="edit-goal">(optional) edit a goal</Label>
                            <Input type="select" name="select" id="edit-goal">
                                <option value={"n/a"}>n/a</option>
                                {goals ? this.generateGoalDropdownOptions(habits, goals) : false}
                            </Input>
                    </FormGroup>
                    
                    <Button>Submit</Button>
            </Form>
            </CardBody>
        );
    }
}