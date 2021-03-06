import React from 'react';
import ProgressChart from './ProgressChart';
import Button from 'react-bootstrap/Button'

class ViewAccomplishments extends React.Component {

    state = {
        week: [],
        daysFromToday: 0
    }

    componentDidMount(){
        this.setWeek()
    }

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

    calculateAccomplishments = () => {
        let sum = 0
        this.props.accomplishments.forEach(acc => {
            if (acc.goal_id === this.props.goal.id && this.state.week.includes(acc.date)) {
                sum += acc.duration
            }
        })
        return sum
    }

    previousWeek = () => {
        let daysFromToday = this.state.daysFromToday - 7
        this.setState({ daysFromToday })
    }

    nextWeek = () => {
        let daysFromToday = this.state.daysFromToday + 7
        this.setState({ daysFromToday })
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.goal !== this.props.goal) {
            this.setState({ daysFromToday: 0})
        }
        
        if (prevState.daysFromToday !== this.state.daysFromToday) {
            this.setWeek()
        }
    }

    render(){
        let start = new Date(this.state.week[0])
        let finish = new Date(this.state.week[6])
    return(
        <div align={'center'}>
            <div className='button-div' align={'center'}>
                <h3>{`Week of ${start.toDateString()} - ${finish.toDateString()}`}</h3>
                <Button variant="secondary" className="week-button" onClick={this.previousWeek}>Previous Week</Button>
                <Button variant="secondary" className="week-button" onClick={this.nextWeek} disabled={this.state.daysFromToday === 0 ? true : false}>Next Week</Button>
                <br></br>
                <br></br>
                <h4><strong>{Math.round(this.calculateAccomplishments()/(this.props.goal.duration * this.props.goal.frequency)*100)}% towards goal!</strong><br/></h4>
                <strong>Goal for the week: </strong>{this.props.goal.duration * this.props.goal.frequency} total minutes<br/>
                <strong>Accomplished this week: </strong>{this.calculateAccomplishments()} minutes<br/>

            </div>
            {<ProgressChart week={this.state.week} goal={this.props.goal.duration * this.props.goal.frequency} accomplished={this.calculateAccomplishments()}/>}
        </div>
        )
    }
}

export default ViewAccomplishments