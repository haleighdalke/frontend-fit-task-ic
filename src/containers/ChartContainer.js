import React from "react";
import DonutChart from '../components/DonutChart'
import { Container } from "reactstrap";

const ChartContainer = (props) => {
    return (
        <div className="chart-container">
            <DonutChart accomplishments={props.accomplishments} goals={props.goals}/>
        </div>
  );
}

export default ChartContainer