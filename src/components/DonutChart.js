import Chart from 'chart.js';
import React, { Component } from "react";

class DonutChart extends Component {

    componentDidMount(){
        this.createChart()
    }

    createChart = () => {
        let data = {
            datasets: [{
                data: [10, 20, 30],
                backgroundColor: [
                    '#ff6384',
                    '#36a2eb',
                    '#cc65fe',
                    '#ffce56'
                ]
            }, {
                data: [30, 20, 10]
            }],
            labels: [
                'Red',
                'Yellow',
                'Blue'
            ]
        }
        let options = Chart.defaults.doughnut
        console.log(options)
        let ctx = document.getElementById('myChart').getContext('2d')
        let myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        })
        return myDoughnutChart
    }

    render(){
        return (
            <div className="donut-chart">
              <canvas id="myChart" width="400" height="400"></canvas>
            </div>
        )
    }
}

export default DonutChart