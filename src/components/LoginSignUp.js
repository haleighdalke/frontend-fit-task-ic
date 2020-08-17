import React from 'react';
import { Button, Card, Form, Input, Container, Col } from "reactstrap";

export default class LoginSignUp extends React.Component {
    state = {
        username: "",
        password: "",
        age: null,
        location: ""
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    generateSignUpForm = () => {
        return(
            <Form className="register-form" onSubmit={(e) => {
                e.preventDefault()
                this.props.handleSignUp(this.state)
            }}>
                <label>Username </label>
                <Input name="username" placeholder="Username" type="text" onChange={this.handleOnChange}/><br/>
                <label>Password </label>
                <Input name="password" placeholder="Password" type="password" onChange={this.handleOnChange}/><br/>
                <label>Age </label>
                <Input name="age" placeholder="Age" type="number" onChange={this.handleOnChange}/><br/>
                <label>Password </label>
                <Input name="location" placeholder="Location" type="text" onChange={this.handleOnChange}/><br/><br/>
                <Button block className="btn-round" color="danger" type="submit">Sign Up</Button>
                <Button block className="btn-round" color="danger" onClick={() => window.location = "/"}>Go Back</Button>
            </Form>
        )
    }

    generateLoginForm = () => {
        return(
            <Form className="register-form" onSubmit={(e) => {
                e.preventDefault()
                this.props.handleLogin(this.state)
            }}>
                <label>Username: </label>
                <Input name="username" placeholder="Username" type="text" onChange={this.handleOnChange}/><br/>
                <label>Password: </label>
                <Input name="password" placeholder="Password" type="password" onChange={this.handleOnChange}/><br/><br/>
                <Button block className="btn-round" color="danger">Login</Button>
                <Button block className="btn-round" color="danger" onClick={() => window.location = "/"}>Go Back</Button>
            </Form>            
        )
    }

    render(){
        return(
        <div className="page-header" style={{ backgroundImage: "url(" + require("../assets/img/run.jpg") + ")"}}>
            <Container>
                <Col className="ml-auto mr-auto" lg="4">
                <Card className="card-register ml-auto mr-auto">
                    <h3 className="title mx-auto">Welcome!</h3>
                    {this.props.login ? this.generateLoginForm() : this.generateSignUpForm()}
                </Card>
                </Col>

            </Container>
        </div>
        )};
}