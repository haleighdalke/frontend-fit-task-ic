import React from "react";
import DonutChart from '../components/DonutChart'
import { Container } from "reactstrap";

const ChartContainer = (props) => {

    return (
        <Container className="chart-container">
            <DonutChart props={props}/>
        </Container>
  );
}

export default ChartContainer