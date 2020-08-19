import React, { Component } from 'react';
import Habit from '../components/Habit'
import AddEditHabit from '../components/AddEditHabit'
import EditHabit from '../components/EditHabit'

class HabitContainer extends Component {
    state = {
        habits: [],
        id: null, 
        activity: "",
        activity_type: ""
    }

    componentDidMount(){
        fetch('http://localhost:3000/habits')
        .then(r => r.json())
        .then(json => {
            this.setState({habits: json})
        })
    }

    generateAllHabits = () => {
        return this.state.habits.map((habit, index) => {
            return <Habit key={index} habit={habit} editHabit={this.editHabit} updateHabit={this.updateHabit}/>
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
            this.setState({habits: [...this.state.habits, json]})
        })
    }

    editHabit = (e, habit) => {
        fetch(`http://localhost:3000/habits/${habit.id}`)
        .then(r => r.json())
        .then(json => {console.log(json.id)
            this.setState({id: json.id, activity: json.activity, activity_type: json.activity_type})
        })
    }

    updateHabit = (habit) => {
        console.log(this.state.id)
        fetch(`http://localhost:3000/habits/${this.state.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(habit)
        }) 
    }

    render() {
        return (
            <div className="habits">    
                <AddEditHabit addHabit={this.addHabit}/>
                <EditHabit editHabit={this.editHabit} updateHabit={this.updateHabit} id={this.state.id} activity={this.state.activity} activity_type={this.state.activity_type}/>
                {this.generateAllHabits()}
            </div>
        );
    }
}

export default HabitContainer;