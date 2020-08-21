import Chart from 'chart.js';
import React, { Component } from "react";
import { Container } from 'reactstrap';

class DonutChart extends Component {
    state = {
        week: null,
        daysFromToday: 0
    }

    componentDidMount(){
        this.setWeek()
    }

    /*
    data: array of accomplishment duration grouped by type --> data array is accomplishment duration, each number is minutes 
    backgroundColor: leave out for now
    labels: habit types 
    */
    setWeek = () => {
        let todayDate = new Date()
        let newDate = todayDate.getDate() + this.state.daysFromToday
        let date = new Date(todayDate.setDate(newDate))
        let week = []
        for (let i = 0; i <= 6; i++) {
            let currentDate = date.getDate() - date.getDay() + i 
            let day = new Date(date.setDate(currentDate))
            const month = () => {
                if (day.getMonth() + 1 < 10) {
                    return `0${day.getMonth() + 1}`
                } else {
                    return day.getMonth() + 1
                }
            }
            const dayNumber = () => {
                if (day.getDate() < 10) {
                    return `0${day.getDate()}`
                } else {
                    return day.getDate()
                }
            }
            let dayString = `${day.getFullYear()}-${month()}-${dayNumber()}`
            week.push(dayString)
        }
        this.setState({ week })
    }
    
    show = () => {
        console.log(this.state.week)
        if(this.props.accomplishments){
            this.props.accomplishments.forEach(acc => {
                if (this.state.week.includes(acc.date)) {
                    let data = {
                        datasets: [{
                            data: [acc.duration, 10, 30], 
                            backgroundColor: [
                                '#66FCF1',
                                '#45A29E',
                                '#fff'
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
                    ctx.innerHTML = ''
                    let myDoughnutChart = new Chart(ctx, {
                        type: 'doughnut',
                        data: data,
                        options: options
                    })
                    return myDoughnutChart
                }
            })
        }
    }

    render(){
        return (
            <Container className="donut-chart">
                {this.show()}
                <canvas id="myChart" width={"400px"} height={"400px"}></canvas>
            </Container>
        )
    }
}

export default DonutChart