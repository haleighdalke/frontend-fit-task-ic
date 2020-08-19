import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './containers/LandingPage';
import LoginSignUp from './components/LoginSignUp';
import MainContent from './containers/MainContent';
import { Switch, Route, withRouter } from 'react-router-dom';

class App extends React.Component {

  state = {
    user: {
      id: null,
      name: "",
      age: "",
      location: ""
    },
    goals: null,
    habits: null,
    token: ""
  }

  componentDidMount(){
    if(localStorage.token){
      fetch('http://localhost:3000/persist',{
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
      })
      .then(res => res.json())
      .then(json => this.handleAuthResponse(json))
  }
}

  // CREATING METHODS
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

  addGoal = () => {
    
  }

  // UPDATING METHODS
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

  updateGoal = () => {}

  // RENDER METHODS
  renderLogin = () => {
    return <LoginSignUp login={true} handleLogin={this.handleLogin}/>
  }

  renderSignUp = () => {
    return <LoginSignUp login={false} handleSignUp={this.handleSignUp}/>
  }

  renderMainContent = () => {
    return <MainContent 
              user={this.state.user} 
              token={this.state.token} 
              goals={this.state.goals} 
              habits={this.state.habits}
              addHabit={this.addHabit}
              updateHabit={this.updateHabit}
              addGoal={this.addGoal}
              updateGoal={this.updateGoal}
              />
  }


  // AUTHENTICATION
  handleAuthResponse = (json) => {
    if (json.user){
      localStorage.token = json.token
      this.setState({
        user: {
          id: json.user.data.attributes.id,
          name: json.user.data.attributes.name,
          age: json.user.data.attributes.age,
          location: json.user.data.attributes.location
        },
        goals: json.user.data.attributes.goals,
        habits: json.user.data.attributes.habits,
        token: json.token
      }, () => this.props.history.push('/main'))
    }
  }

  handleLogin = ({name, password}) => {
    let user = {
      name: name,
      password: password
    }

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.error){
        this.handleAuthResponse(json)
      } else {
        alert(json.error)
      }
    })
  }

  handleSignUp = ({name, password, age, location}) => {
    let newUser = {
      name: name,
      password: password,
      age: age,
      location: location
    }
    
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.error) {
        this.handleAuthResponse(json)
      } else {
        alert(json.error)
      }
      })
    }


  render(){
//     HabitContainer: <HabitContainer/>
//     User: <User/>  
    return (
    <div className="App">
      {/* <HabitContainer/> */}
      <Switch>
        <Route path="/" exact component={LandingPage}/>
        <Route path="/login" render={this.renderLogin}/>
        <Route path="/signup" render={this.renderSignUp}/>
        <Route path="/main" render={this.renderMainContent}/>
      </Switch>

    </div>
  )};
}

export default withRouter(App)