import React, { Component } from 'react';
import Habit from '../components/Habit'

class HabitContainer extends Component {
    state = {habits: []}

    componentDidMount(){
        fetch('http://localhost:3000/habits')
        .then(r => r.json())
        .then(json => {
            this.setState({habits: json})
        })
    }

    generateAllHabits = () => {
        return this.state.habits.map((habit, index) => {
            return <Habit key={index} habit={habit}/>
        })
    }

    render() {
        return (
            <div>{this.generateAllHabits()}</div>
        );
    }
}

export default HabitContainer;