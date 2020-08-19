import Chart from 'chart.js';
import React, { Component } from "react";
import { Container } from 'reactstrap';

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
        let ctx = document.getElementById('myChart')
        let myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        })
        return myDoughnutChart
    }

    render(){
        return (
            <Container className="donut-chart">
              <canvas id="myChart" width={"400px"} height={"400px"}></canvas>
            </Container>
        )
    }
}

export default DonutChart