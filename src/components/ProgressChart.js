import Chart from 'chart.js';
import React from 'react';

class ProgressChart extends React.Component {

    componentDidMount(){
        this.createChart()
    }

    accomplished = () => {
        if (this.props.accomplished / this.props.goal > 1) {
            return 100
        } else {
            return Math.round(this.props.accomplished / this.props.goal * 100)
        }
    }

    leftTowardsGoal = () => {
        if (this.props.accomplished / this.props.goal > 1) {
            return 0
        } else {
            return 100 - Math.round((this.props.accomplished / this.props.goal * 100))
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps !== this.props) {
            this.createChart()
        }
    }

    createChart = () => {
        let data = {
            datasets: [{
                data: [this.accomplished(), this.leftTowardsGoal()],
                backgroundColor: [
                    '#66FCF1',
                    '#C5C6C7'
                ]
            }],
            labels: [
                '% Accomplished of Goal',
                '% Left Towards Goal',
            ]
        }

        let options = {
            responsive: true,
            maintainAspectRation: false,
            legend: {
                position: 'top',
            },
            animation: {
                animateScale: true,
                animateRotate: true
            },
            circumference: Math.PI,
            rotation: -Math.PI
        }

        let ctx = document.getElementById('progressChart')
        ctx.innerHTML = ""
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
        }
        return(
        <div className="progress-chart" style={style}>
            <canvas id="progressChart"></canvas>
        </div>
        )}
}

export default ProgressChart