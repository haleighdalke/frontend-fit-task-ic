import React, { Component } from 'react';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

export default class HabitContainer extends Component {
    state = {
        id: null, 
        activity: "",
        activity_type: "",
        habitAdd: true
    }

    // controlled form (add and update)
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, addHabit, updateHabit) => {
        e.preventDefault()
        let habit = {
            activity: this.state.activity,
            activity_type: this.state.activity_type
        }
        this.state.habitAdd ? addHabit(habit) : updateHabit(this.state.id, habit)
        this.setState({
            id: null,
            activity: "",
            activity_type: "",
            habitAdd: true
        })
        e.target.reset()
    }

    // autofill form (update)
    autoFillForm = (selectedValue, habits) => {
        if(selectedValue === "n/a"){
            this.setState({
                id: null,
                activity: "",
                activity_type: "",
                habitAdd: true
            })
        }else{
            let habit = habits.find(habit => habit.id == selectedValue)
            this.setState({
                id: habit.id,
                activity: habit.activity,
                activity_type: habit.activity_type,
                habitAdd: false
            })
        }
    }

    generateHabitDropdownOptions = (habits) => {
        // console.log(habits)
        return habits.map(habit => {
            return <option id={habit.id} key={habit.id} value={habit.id}>{habit.activity}</option>
        })
    }


    render() {
        let {habits, addHabit, updateHabit} = this.props
        return (
            <CardBody>
                <Form onSubmit={(e) => this.handleSubmit(e, addHabit, updateHabit)}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                {/* <Label for="activity">New Activity:</Label> */}
                                <Input type="text" name="activity" id="activity" placeholder="Activity" value={this.state.activity} onChange={this.handleOnChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                {/* <Label for="activity-type">New Activity Type:</Label> */}
                                <Input type="text" name="activity_type" id="activity-type" placeholder="Activity Type" value={this.state.activity_type} onChange={this.handleOnChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    
                        <FormGroup onChange={(e) => this.autoFillForm(e.target.value, habits)}>
                            <Label for="edit-habit">(optional) edit a habit</Label>
                                <Input type="select" name="selectMulti" id="edit-habit">
                                    <option value={"n/a"}>n/a</option>
                                    {habits ? this.generateHabitDropdownOptions(habits) : false}
                                </Input>
                        </FormGroup>
                    
                    <Button>Submit</Button>
            </Form> 
            </CardBody>
        );
    }
}