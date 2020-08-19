import React from 'react'
import {Button} from "reactstrap";

export default class Goal extends React.Component{

    render(){
        return (
            <div className="card">
                <div className="card-body">
                    <p className="card-title">Frequency: {
                        this.props.goal.frequency
                    }</p>
                    <p className="card-text">Duration: {
                        this.props.goal.duration
                    }</p>
                     <p className="card-text">Duration type: {
                        this.props.goal.duration_type
                    }</p>
                    <Button onClick={(e) => this.props.editGoal(e, this.props.goal)}>Edit Habit</Button>
                </div>
            </div>
        )
    }
}