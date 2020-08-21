import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const NotFound = () => {

    return (
      <div style={{backgroundImage: "url(" + require("../assets/img/run-black-background.jpg") + ")",}} className="page-header">
        <Jumbotron>
          <h1>404 Page Not Found!</h1><br/>
          <p>
            <Button variant="secondary" onClick={() => window.location = "/"}>Click to return to the main page!</Button>
          </p>
        </Jumbotron>
      </div>
  );
}

export default NotFound