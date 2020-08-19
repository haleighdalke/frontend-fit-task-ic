import React from 'react';
import { Button, Form, Input} from "reactstrap";

export default class AddGoal extends React.Component {
    state = {
        frequency: "",
        duration: null,
        duration_type: ''
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <div className="add-edit-habits">
                <Form className="add-habit" onSubmit={(e) => {
                    e.preventDefault()
                    this.props.addHabit(this.state)
                }}>
                    <label>New Goal frequency: </label>
                    <Input name="frequency"placeholder="Frequency" type="text" onChange={this.handleOnChange}/><br/>
                    <label>New Duration: </label>
                    <Input name="duration"placeholder="Duration" type="text"onChange={this.handleOnChange}/><br/>
                    <label>New Duration Type: </label>
                    <Input name="duration_type"placeholder="Duration Type" type="text"onChange={this.handleOnChange}/><br/>
                    <Button block className="btn-round" color="danger">Add New Goal</Button><br/>
                </Form>          
            </div>
        )
    };
}