import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Header = ({ text }) => (<h1>{text}</h1>)

const Statistic = ({text, value}) => (<tr><td>{text}</td><td>{value}</td></tr>)

const Statistics = (props) => {
    if (props.good + props.bad + props.neutral === 0) {
        return <p>No feedback given</p>
    }

    return (
        <table>
            <Statistic text="good" value={props.good} />
            <Statistic text="neutral" value={props.neutral} />
            <Statistic text="bad" value={props.bad} />
            <Statistic text="all" value={props.all} />
            <Statistic text="average" value={props.mean} />
            <Statistic text="positive" value={props.positive} />
        </table>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const giveBadFeedback = newValue => setBad(newValue)
    const giveGoodFeedback = newValue => setGood(newValue)
    const giveNeutralFeedback = newValue => setNeutral(newValue)

    const all = ()  => (good + bad + neutral)
    const mean = () => (good * 1 + bad * -1) / (good + neutral + bad)
    const positive = () => good / (bad + neutral + good)

    return (
        <div>
            <Header text="Feedback application" />
            <Header text="give feedback" />
            <Button handleClick={() => giveGoodFeedback(good + 1)} text="good" />
            <Button handleClick={() => giveNeutralFeedback(neutral + 1)} text="neutral" />
            <Button handleClick={() => giveBadFeedback(bad + 1)} text="bad" />
            <Header text="statistics" />
            <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all()} mean = {mean()} positive = {positive()}/>

        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)