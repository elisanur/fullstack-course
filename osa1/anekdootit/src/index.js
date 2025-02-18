import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>

)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [allVotes, setVotes] = useState([0,0,0,0,0,0])

    const index = () => Math.floor(Math.random() * anecdotes.length)
    const randomAnecdote = () => setSelected(index)
    const vote = () => {
        const copy = [...allVotes]
        copy[selected] += 1
        setVotes([...copy])
    }
    const mostVotedAnecdote = () => {
        let index = 0
        let va = "";
        let vo = 0;
        for (const value of allVotes){
            if (value > vo){
                vo = value
                va = anecdotes[index]
            }
            index ++
        }
        return va
    }
    console.log("anecdote...",mostVotedAnecdote())
    const mostVotedVotes = () => Math.max(...allVotes)
    console.log("votes...",mostVotedVotes())
    console.log(allVotes)

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>has {allVotes[selected]} votes</p>
            <Button text="vote" handleClick={() => vote()} />
            <Button text="next anecdote" handleClick={() => randomAnecdote()} />
            <p></p>
            <h1>Anecdote with most votes</h1>
            <p>{mostVotedAnecdote()}</p>
            <p>has {mostVotedVotes()} votes</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
