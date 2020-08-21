import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './containers/LandingPage';
import NotFound from './containers/NotFound';
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
    accomplishments: null,
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
        this.setState({
          habits: [...this.state.habits, {
            id: json.id,
            activity: json.activity,
            activity_type: json.activity_type
      }]})
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
      this.setState({
        goals: [...this.state.goals, {
          id: json.id,
          frequency: json.frequency,
          duration: json.duration,
          duration_type: "min",
          habit_id: json.habit_id
    }]})
  })
  }

  addAnAccomplishment = (accomplishment) => {
    fetch('http://localhost:3000/accomplishments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(accomplishment)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.error){
        this.setState({ accomplishments: [...this.state.accomplishments, json.data.attributes]})
      } else {
        alert(json.error)
      }
    })}
    
  // UPDATING METHODS
  updateHabit = (id, habit) => {
    fetch(`http://localhost:3000/habits/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(habit)
    })
    .then(res => res.json())
    .then(json => {
        let habits = this.state.habits.map(habit => {
            if(habit.id === json.id){
                let newHabit = {
                    id: json.id,
                    activity: json.activity,
                    activity_type: json.activity_type
                }
                return newHabit
            }else{
                return habit
            }
        })
        this.setState({
            habits: habits
    })})
}

updateGoal = (id, goal) => {
  fetch(`http://localhost:3000/goals/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
      },
      body: JSON.stringify(goal)
  })
  .then(res => res.json())
  .then(json => {
      let goals = this.state.goals.map(goal => {
          if(goal.id === json.id){
              let newGoal = {
                id: json.id,
                frequency: json.frequency,
                duration: json.duration,
                duration_type: json.duration_type,
                habit_id: json.habit_id,
                user_id: json.user_id
              }
              return newGoal
          }else{
              return goal
          }
      })
      this.setState({
          goals: goals
  })})
}

  deleteGoal = (id, goal) => {
    fetch(`http://localhost:3000/goals/${id}`, {method: 'DELETE'}) 
    .then(r => r.json())
    .then(json => {
      console.log(json)
      let goals = this.state.goals.filter(goal => goal.id !== id)
      this.setState({
        goals: goals
      })
    })
  }

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
              accomplishments={this.state.accomplishments}
              addAccomplishment={this.addAnAccomplishment}
              deleteGoal={this.deleteGoal}
              />
  }

  getAllHabits = () => {
    fetch('http://localhost:3000/habits')
    .then(res => res.json())
    .then(data => this.setState({habits: data}))
  }

  // AUTHENTICATION
  handleAuthResponse = (json) => {
    if (json.user){
      localStorage.token = json.token
      this.getAllHabits()
      this.setState({
        user: {
          id: json.user.data.attributes.id,
          name: json.user.data.attributes.name,
          age: json.user.data.attributes.age,
          location: json.user.data.attributes.location
        },
        goals: json.user.data.attributes.goals,
        habits: json.user.data.attributes.habits,
        accomplishments: json.user.data.attributes.accomplishments,
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
    return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={LandingPage}/>
        <Route path="/login" render={this.renderLogin}/>
        <Route path="/signup" render={this.renderSignUp}/>
        <Route path="/main" render={this.renderMainContent}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  )};
}

export default withRouter(App)