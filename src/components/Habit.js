import React from 'react'

const Habit = (props) => (
    <div>
        <div className="card">
            <div className="card-body">
                <p className="card-title">Activity: {
                    props.habit.activity
                }</p>
                <p className="card-text">Activity Type: {
                    props.habit.activity_type
                }</p>
            </div>
        </div>
    </div>
);

export default Habit