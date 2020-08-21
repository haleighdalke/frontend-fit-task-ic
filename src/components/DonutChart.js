import Chart from 'chart.js';
import React, { Component } from "react";
import { Container } from 'reactstrap';

class DonutChart extends Component {

    state = {
        data: []
    }

    componentDidUpdate(){
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
        
        let colorOptions = ["#66FCF1", "#45A29E", "#C5C6C7",  "#008081", "#4F97A3", "#81D8D0", "#7EF9FF", "#3FE0D0", "#B0DFE5", "#468284"]
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
        console.log(data)
        return data
    }

    

    createChart = () => {
        let data = this.generateDataset()
        // console.log(data)
        // let data = {
        //     datasets: [{
        //         data: [10, 20, 30], 
        //         backgroundColor: [
        //             '#66FCF1',
        //             '#45A29E',
        //             '#fff'
        //         ]
        //     }, {
        //         data: [30, 20, 10],
        //         backgroundColor: [
        //             '#66FCF1',
        //             '#45A29E',
        //             '#fff'
        //         ]
        //     },
        //     {
        //         data: [25, 20, 22],
        //         backgroundColor: [
        //             '#45A29E',
        //             '#fff',
        //             '#66FCF1'
        //         ]
        //     }, {
        //         data: [28, 20, 15],
        //         backgroundColor: [
        //             '#45A29E',
        //             '#fff',
        //             '#66FCF1'
        //         ]
        //     }],
        //     labels: [
        //         'Exercise',
        //         'Self-Care',
        //         'Other'
        //     ]
        // }
        let options = Chart.defaults.doughnut
        // console.log(options)
        let ctx = document.getElementById('myChart')
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