import React from 'react';
import { Button, Form, Input} from "reactstrap";

export default class AddEditHabit extends React.Component {
    state = {
        activity: "",
        activity_type: ""
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
                    <label>New Activity: </label>
                    <Input name="activity"placeholder="Activity" type="text" onChange={this.handleOnChange}/><br/>
                    <label>New Activity Type: </label>
                    <Input name="activity_type"placeholder="Activity Type" type="text"onChange={this.handleOnChange}/><br/>
                    <Button block className="btn-round" color="danger">Add New Habit</Button><br/>
                </Form>          
            </div>
        )
    };
}