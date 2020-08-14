import React from 'react';
import './App.css';
import LandingPage from './containers/LandingPage';
import LoginSignUp from './components/LoginSignUp';

import { BrowserRouter, Route } from 'react-router-dom';

export default class App extends React.Component {

  renderLogin = () => {
    return <LoginSignUp login={true} handleLogin={this.handleLogin}/>
  }

  renderSignUp = () => {
    return <LoginSignUp login={false} handleSignUp={this.handleSignUp}/>
  }

  handleLogin = ({username, password}) => {
    console.log('username', username)
    console.log('password', password)
  }

  handleSignUp = ({username, password, age, location}) => {
    console.log('username', username)
    console.log('password', password)
    console.log('age', age)
    console.log('location', location)
  }

  render(){
    return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={LandingPage}/>
        <Route path="/login" render={this.renderLogin}/>
        <Route path="/signup" render={this.renderSignUp}/>
      </BrowserRouter>
    </div>
  )};
}
