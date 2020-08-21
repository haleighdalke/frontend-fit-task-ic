import React, {Component} from "react";
import DonutChart from '../components/DonutChart'

export default class ChartContainer extends Component {
    state = {
        week: [],
        daysFromToday: 0,
        weeklyAccomplishments: []
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

    // calculateAccomplishments = () => {
    //     let sum = 0
    //     this.props.accomplishments.forEach(acc => {
    //         if (this.state.week.includes(acc.date)) {
    //             sum += acc.duration
    //         }
    //     })
    //     return sum
    // }

    getGoalType = (goal_id) => {
        let foundGoal = this.props.goals.filter(goal => goal.id == goal_id)[0]
        return foundGoal ? this.getHabitType(foundGoal.habit_id) : false
    }

    getHabitType = (habit_id) => {
        let foundHabit = this.props.habits.filter(habit => habit.id == habit_id)[0]
        if (foundHabit) return foundHabit.activity_type
    }

    renderWeeklyAccomplishmentsByType = () => {
        if(this.props.accomplishments && this.state.week.length > 0 && this.props.habits.length > 0 && this.props.goals.length > 0){
            let acc = this.props.accomplishments
            let arr = this.state.week.map(day => {
                return acc.filter(oneAcc => oneAcc.date === day)
            })
            let newArr = arr.map(day => {
                let littleHash = {}
                day.forEach(acc => {
                    let type = this.getGoalType(acc.goal_id)
                    if(!(type in littleHash)){
                        littleHash[type] = [acc.duration]
                    }else{
                        littleHash[type].push(acc.duration)
                    }
                })
                return littleHash
            })
            return newArr
        } 
        else{
            return false
        }
        
    }

    // previousWeek = () => {
    //     let daysFromToday = this.state.daysFromToday - 7
    //     this.setState({ daysFromToday })
    // }

    // nextWeek = () => {
    //     let daysFromToday = this.state.daysFromToday + 7
    //     this.setState({ daysFromToday })
    // }

    // componentDidUpdate(prevProps, prevState){
    //     if (prevProps.goal !== this.props.goal) {
    //         this.setState({ daysFromToday: 0})
    //     }
    //     if (prevState.daysFromToday !== this.state.daysFromToday) {
    //         this.setWeek()
    //     }
    // }

    render(){
        return (
            <div className="chart-container">
                {this.renderWeeklyAccomplishmentsByType() ? <DonutChart week={this.state.week} weeklyAccomplishments={this.renderWeeklyAccomplishmentsByType()}/> : false}
                
            </div>
      );
    }
    
}
