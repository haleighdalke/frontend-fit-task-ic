import React, { Component } from 'react';
import Habit from '../components/Habit'
import EditHabit from '../components/EditHabit'
import {Container, CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'
import { act } from '@testing-library/react';

export default class HabitContainer extends Component {
    state = {
        habits: [],
        id: null, 
        activity: "",
        activity_type: "",
        habitAdd: true
    }

    componentDidMount(){
        fetch('http://localhost:3000/habits')
        .then(r => r.json())
        .then(json => {
            this.setState({habits: json})
        })
    }

    // generateAllHabits = () => {
    //     return this.state.habits.map((habit, index) => {
    //         return <Habit key={index} habit={habit} editHabit={this.editHabit} updateHabit={this.updateHabit}/>
    //     })
    // }

    // editHabit = (e, habit) => {
    //     fetch(`http://localhost:3000/habits/${habit.id}`)
    //     .then(r => r.json())
    //     .then(json => {console.log(json.id)
    //         this.setState({id: json.id, activity: json.activity, activity_type: json.activity_type})
    //     })
    // }
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    autoFillForm = (value) => {
        if(value === "n/a"){
            this.setState({
                id: null,
                activity: "",
                activity_type: "",
                habitAdd: true
            })
        }else{
            let habit = this.state.habits.find(habit => habit.id == value)
            this.setState({
                id: habit.id,
                activity: habit.activity,
                activity_type: habit.activity_type,
                habitAdd: false
            })
        }
    }

    generateHabitDropdownOptions = () => {
        return this.state.habits.map(habit => {
            return <option id={habit.id} value={habit.id}>{habit.activity}</option>
        })
            
    }

    addHabit = (newHabit) => {
        fetch(`http://localhost:3000/habits`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(newHabit),
        }) 
        .then(r => r.json())
        .then(json => {
            console.log(json)
            let habits = this.state.habits.map(habit => {
                if(habit.id === json.data.id){
                    let newHabit = {
                        id: json.data.id,
                        activity: json.data.attributes.activity,
                        activity_type: json.data.attributes.activity_type
                    }
                    return newHabit
                }else{
                    return habit
                }
            })
            //update state and reset for forms
            this.setState({
                habits: habits,
                activity: "",
                activity_type: "",
                habitAdd: true
        })})
            // this.setState({habits: [...this.state.habits, {
            //     id: json.data.id,
            //     activity: json.data.attributes.activity,
            //     activity_type: json.data.attributes.activity_type
            // }]})
    }

    updateHabit = (habit) => {
        // console.log(this.state.id)
        fetch(`http://localhost:3000/habits/${this.state.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(habit)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            let habits = this.state.habits.map(habit => {
                if(habit.id === json.data.id){
                    let newHabit = {
                        id: json.data.id,
                        activity: json.data.attributes.activity,
                        activity_type: json.data.attributes.activity_type
                    }
                    return newHabit
                }else{
                    return habit
                }
            })
            //update state and reset for forms
            this.setState({
                habits: habits,
                activity: "",
                activity_type: "",
                habitAdd: true
        })})
    }

    render() {
        return (
            <CardBody>
                <Form onSubmit={(e) => {
                    e.preventDefault()
                    this.state.habitAdd ? this.addHabit({activity: this.state.activity, activity_type: this.state.activity_type}) : this.updateHabit({activity: this.state.activity, activity_type: this.state.activity_type})
                    e.target.reset()
                    }}>
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
                    
                        <FormGroup onChange={(e) => this.autoFillForm(e.target.value)}>
                            <Label for="edit-habit">(optional) edit a habit</Label>
                                <Input type="select" name="selectMulti" id="edit-habit">
                                    <option value={"n/a"}>n/a</option>
                                    {this.generateHabitDropdownOptions()}
                                </Input>
                        </FormGroup>
                    
                    <Button>Submit</Button>
            </Form> 
                {/* <EditHabit editHabit={this.editHabit} updateHabit={this.updateHabit} id={this.state.id} activity={this.state.activity} activity_type={this.state.activity_type}/> */}
            </CardBody>
        );
    }
}