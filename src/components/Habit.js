import React from 'react'
import EditHabit from './EditHabit'
import {Button} from "reactstrap";

export default class Habit extends React.Component{
    pass = () => {
        return <EditHabit habit={this.props.habit}/>
    }
    render(){
        return (
            <div className="card">
                <div className="card-body">
                    <p className="card-title">Activity: {
                        this.props.habit.activity
                    }</p>
                    <p className="card-text">Activity Type: {
                        this.props.habit.activity_type
                    }</p>
                    <Button onClick={(e) => this.props.editHabit(e, this.props.habit)}>Edit Habit</Button>
                </div>
            </div>

        )
    }
}