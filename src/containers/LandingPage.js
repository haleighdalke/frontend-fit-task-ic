import React from "react";
import { Button, Container } from "reactstrap";
import { useHistory } from 'react-router-dom'

const LandingPage = () => {
  let history = useHistory()

    return (
      <div style={{backgroundImage: "url(" + require("../assets/img/run.jpg") + ")",}} className="page-header">
        <Container>
            <h1>FIT-TASK-IC</h1>
            <h3>Set your goals and keep yourself in check!</h3>
            <br />
            <Button className="btn-round" onClick={() => history.push('/login')}>Login</Button>
            <Button className="btn-round" onClick={() => history.push('/signup')}>Signup</Button>
        </Container>
      </div>
  );
}

export default LandingPage