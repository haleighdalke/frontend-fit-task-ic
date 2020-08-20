import React from 'react';
import { withRouter } from 'react-router-dom';
import ChartContainer from './ChartContainer';
import NavbarContainer from './NavbarContainer'; 

class MainContent extends React.Component {

    render(){
    let {user, token, goals, habits, addHabit, updateHabit, addGoal, updateGoal, deleteGoal} = this.props
    return(
        <div className="container-fluid" className="main-content">
            <ChartContainer/>
            <NavbarContainer 
                user={user} 
                token={token} 
                goals={goals} 
                habits={habits} 
                addHabit={addHabit} 
                updateHabit={updateHabit} 
                addGoal={addGoal} 
                updateGoal={updateGoal}
                deleteGoal={deleteGoal}
                />
            
        </div>
    )}
}

export default withRouter(MainContent)