import React from "react";
import DonutChart from '../components/DonutChart'

const ChartContainer = (props) => {

    return (
        <div className="chart-container">
            <DonutChart props={props}/>
        </div>
  );
}

export default ChartContainer