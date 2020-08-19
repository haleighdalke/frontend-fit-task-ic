import React from 'react';
import { Button, Form, Input} from "reactstrap";

export default class EditHabit extends React.Component {
    state = {
        id: this.props.id,
        activity: '',
        activity_type: ''
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
                    this.props.updateHabit(this.state)
                }}>
                    <label>Update Activity: </label>
                    <Input name="activity"placeholder={this.props.activity} type="text" onChange={this.handleOnChange}/><br/>
                    <label>Update Activity Type:</label>
                    <Input name="activity_type"placeholder={this.props.activity_type} type="text"onChange={this.handleOnChange}/><br/>
                    <Button block className="btn-round" color="danger">Update Habit</Button><br/>
                </Form>          
            </div>
        )
    };
}