import React from "react";
import DonutChart from '../components/DonutChart'
import { Container } from "reactstrap";

const ChartContainer = (props) => {

    return (
        <div className="chart-container">
            <DonutChart props={props}/>
        </div>
  );
}

export default ChartContainer