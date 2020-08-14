import React from "react";
import { Button, Container } from "reactstrap";

const LandingPage = () => {
  // let pageHeader = React.createRef();

  // React.useEffect(() => {
  //   if (window.innerWidth < 991) {
  //     const updateScroll = () => {
  //       let windowScrollTop = window.pageYOffset / 3;
  //       pageHeader.current.style.transform =
  //         "translate3d(0," + windowScrollTop + "px,0)";
  //     };
  //     window.addEventListener("scroll", updateScroll);
  //     return function cleanup() {
  //       window.removeEventListener("scroll", updateScroll);
  //     };
  //   }
  // });

  return (
      <div
        style={{
          backgroundImage:
          "url(" + require("../assets/img/run.jpg") + ")",
        }}
        className="page-header"
      >
        <Container>
          <div className="motto text-center">
            <h1>FIT-TASK-IC</h1>
            <h3>Set your goals and keep yourself in check!</h3>
            <br />
            <Button className="btn-round" color="neutral" type="button" outline>Login</Button>
            <Button className="btn-round" color="neutral" type="button" outline>Signup</Button>
          </div>
        </Container>
      </div>
  );
}

export default LandingPage