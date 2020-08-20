import Chart from 'chart.js';
import React, { Component } from "react";
import { Container } from 'reactstrap';

class DonutChart extends Component {

    componentDidMount(){
        this.createChart()
    }

    /*
    data: array of accomplishment duration grouped by type --> data array is accomplishment duration, each number is minutes 
    backgroundColor: leave out for now
    labels: habit types 
    */

    createChart = () => {
        console.log(this.props)
        let data = {
            datasets: [{
                data: [10, 20, 30], 
                backgroundColor: [
                    '#66FCF1',
                    '#45A29E',
                    '#fff'
                ]
            }, {
                data: [30, 20, 10],
                backgroundColor: [
                    '#66FCF1',
                    '#45A29E',
                    '#fff'
                ]
            },
            {
                data: [25, 20, 22],
                backgroundColor: [
                    '#45A29E',
                    '#fff',
                    '#66FCF1'
                ]
            }, {
                data: [28, 20, 15],
                backgroundColor: [
                    '#45A29E',
                    '#fff',
                    '#66FCF1'
                ]
            }],
            labels: [
                'Exercise',
                'Self-Care',
                'Other'
            ]
        }
        let options = Chart.defaults.doughnut
        // console.log(options)
        let ctx = document.getElementById('myChart')
        let myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        })
        return myDoughnutChart
    }

    render(){
        let style = {
            position: 'relative',
            height: '100vh',
            width: '100vh'
        }
        return (
            <Container className="donut-chart" style={style}>
                <canvas id="myChart" width={"400px"} height={"400px"}></canvas>
            </Container>
        )
    }
}

export default DonutChart