import React from 'react';
import { Button, Form, Input} from "reactstrap";

export default class EditGoal extends React.Component {
    state = {
        id: this.props.id,
        frequency: '',
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
            <div className="edit-habits">
                <Form className="update-habit" onSubmit={(e) => {
                    e.preventDefault()
                    this.props.updateGoal(this.state)
                }}>
                    <label>Update Goal frequency: </label>
                    <Input name="frequency"placeholder="Frequency" type="text" onChange={this.handleOnChange}/><br/>
                    <label>Update Duration: </label>
                    <Input name="duration"placeholder="Duration" type="text"onChange={this.handleOnChange}/><br/>
                    <label>Update Duration Type: </label>
                    <Input name="duration_type"placeholder="Duration Type" type="text"onChange={this.handleOnChange}/><br/>
                    <Button block className="btn-round" color="danger">Update Goal</Button><br/>
                </Form>          
            </div>
        )
    };
}