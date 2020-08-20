import React, { Component } from 'react';

class User extends Component {
    state = {user: []}

    componentDidMount(user){
        fetch(`http://localhost:3000/users/${user.data.id}`)
        .then(r => r.json())
        .then(json => {
            this.setState({user: json.data.attributes})
        })
    }

    render() {
        // console.log(this.state.user.habits)

        return (
            <div>
                <h1>Name: {this.state.user.name}</h1>
                <h3>Age: {this.state.user.age}</h3>
                <h3>Location: {this.state.user.location}</h3>
                <p>Habits: Include this?</p>
                <ul>
                    {/* {this.state.user.habits.map((habit, index) => (
                        <li key={index}>{habit.activity}</li>
                    ))} */}
                </ul>
            </div>
        );
    }
}

export default User;