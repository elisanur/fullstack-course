import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {

    const total = () => course.parts.reduce(function(sum, part) {
        return sum + part.exercises
    },0)

    return (
        <div>
            <Header course={course} />
            <ul>
                <Content content={course.parts} />
            </ul>
            <p>total of {total()} exercises</p>
        </div>
    )
}

export default Course