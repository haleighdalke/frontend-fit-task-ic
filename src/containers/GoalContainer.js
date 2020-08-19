import React, { Component } from 'react';
import Goal from '../components/Goal'
import AddGoal from '../components/AddGoal'
import EditGoal from '../components/EditGoal'

export default class GoalContainer extends Component {
    state = {
        goals: [],
        id: null, 
        frequency: '',
        duration: null,
        duration_type: ""
    }

    componentDidMount(){
        fetch('http://localhost:3000/goals')
        .then(r => r.json())
        .then(json => {
            this.setState({habits: json})
        })
    }

    generateAllGoals = () => {
        return this.state.goals.map((goal, index) => {
            return <Goal key={index} goal={goal} editGoal={this.editGoal} updateGoal={this.updateGoal}/>
        })
    }

    addGoal = (newGoal) => {
        fetch(`http://localhost:3000/goals`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(newGoal),
        }) 
        .then(r => r.json())
        .then(json => {
            this.setState({goals: [...this.state.goals, json]})
        })
    }

    editGoal = (e, goal) => {
        fetch(`http://localhost:3000/goals/${goal.id}`)
        .then(r => r.json())
        .then(json => {console.log(json.id)
            this.setState({id: json.id, frequency: json.frequency, duration: json.duration, duration_type: json.duration_type})
        })
    }

    updateGoal = (goal) => {
        fetch(`http://localhost:3000/goals/${this.state.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(goal)
        }) 
        .then(r => r.json())
        .then(json => {
            this.setState({habits: [...this.state.goals.slice(0, json.id - 1), json, ...this.state.habits.slice(json.id, this.state.goals.length) ]})
        })
    }

    deleteGoal = (e, goal) => {
        fetch(`http://localhost:3000/goals/${goal.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }) 
        .then(r => r.json())
        .then(json => {
            this.setState({habits: [...this.state.goals.slice(0, json.id - 1), ...this.state.habits.slice(json.id, this.state.goals.length) ]})
        })
    }

    render() {
        return (
            <div className="goals">    
                <AddGoal addHabit={this.addGoals}/>
                <EditGoal editGoal={this.editGoal} updateGoal={this.updateGoal} id={this.state.id} 
                frequency={this.state.frequency} duration={this.state.duration}duration_type={this.state.duration_type}/>
                {this.generateAllGoals()}
            </div>
        );
    }
}