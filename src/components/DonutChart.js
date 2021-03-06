import Chart from 'chart.js';
import React, { Component } from "react";
import { Container } from 'reactstrap';

class DonutChart extends Component {
    state = {
        week: null,
        daysFromToday: 0
    }

    state = {
        data: []
    }

    componentDidUpdate(){
        let container = document.querySelector('div.donut-chart')
        container.innerHTML = '<canvas id="myChart" height="400px" width="400px"></canvas>'
        this.createChart()
    }

    // componentDidUpdate(){
    //     this.createChart()
    // }

    
    // data: array of accomplishment duration grouped by type --> data array is accomplishment duration, each number is minutes 
    // backgroundColor: leave out for now
    // labels: habit types 

    generateDataset = () => {
        let {week, weeklyAccomplishments} = this.props
        let colorOptions = ['#3FEEE6', '#55BCC9', '#97CAEF', '#CAFAFE', '#FC4445']
        // ["#66FCF1", "#45A29E", "#C5C6C7",  "#008081", "#4F97A3", "#81D8D0", "#7EF9FF", "#3FE0D0", "#B0DFE5", "#468284"]
        let data = {
            datasets: [], 
            labels: []
        }

        weeklyAccomplishments.forEach(day => {
            // let dataset = {data: [], backgroundColor: []}
            let types = Object.keys(day)
            let values = Object.values(day)
            let sumValues = values.map(value => {
                return value.reduce(function(a, b){
                    return a + b
                }, 0)
            })

            if(sumValues.length > 0){
                data.datasets = [...data.datasets, {
                    data: sumValues,
                    backgroundColor: colorOptions.slice(0, sumValues.length)
                }]
                
                types.forEach(type => {
                    if(!data.labels.includes(type)){
                        data.labels = [...data.labels, type]
                    }
                })
            }
            // return dataset
        })
        return data
    }

    createChart = () => {
        let data = this.generateDataset()
        let options = Chart.defaults.doughnut
        let ctx = document.getElementById('myChart')
        // ctx.innerHTML = ""
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
              <canvas id="myChart"></canvas>
            </Container>
        )
    }
}

export default DonutChart