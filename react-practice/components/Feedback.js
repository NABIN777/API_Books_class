'use client'
import { useState } from "react";

const Statistics = (props) => {
    console.log(props);
    const {Good, Neutral, Bad, History} = props

    
    const Total = Good + Neutral + Bad;
    const Average = (Good + Neutral)/ Total;

    return (
        <>
            <h2>Statistics</h2>
            <p>Good: {Good}</p>
            <p>Neutral: {Neutral}</p>
            <p>Bad: {Bad}</p>
            <p>All: {Total}</p>
            <p>Average: {Average}</p>  
            <p>{History}</p>    
        </>
    )
}

const Buttons = (props) => {
    return (
        <>
            <button onClick={props.handleClick}>{props.text}</button>
        </>
    )
}



export default function Feedback() {
    // const [Good, setGood] = useState(0)
    // const [Neutral, setNeutral] = useState(0)
    // const [Bad, setBad] = useState(0)

    const [Feedback, setFeedback] = useState(
        {Good: 0, Neutral : 0, Bad : 0}
    )

    const [History, setHistory] = useState([])

    // const handleGood = () => setGood(Good + 1)
    // const handleNeutral = () => setNeutral(Neutral + 1)
    // const handleBad = () => setBad(Bad + 1)

    // const handleGood = () => setFeedback(Feedback.Good + 1, Neutral, Feedback.Neutral, Feedback.Bad)
    // const handleNeutral = () => setFeedback(Feedback.Good, Feedback.Neutral + 1, Feedback.Bad)
    // const handleBad = () => setFeedback(Feedback.Good, Feedback.Neutral, Feedback.Bad + 1)

    // Always use functional operations(functions that create new copy and updates it eg. concat) {key message}
    const handleGood = () => {
        setFeedback({...Feedback, Good: Feedback.Good + 1})
        setHistory(History.concat('G'))
    }
    const handleNeutral = () => setFeedback({...Feedback, Neutral: Feedback.Neutral + 1})
    const handleBad = () => setFeedback({...Feedback, Bad: Feedback.Bad + 1})

    return (
        <>
            <h2>Give Feedback</h2>

            <Buttons handleClick={handleGood} text="Good"/>
            <Buttons handleClick={handleNeutral} text="Neutral"/>
            <Buttons handleClick={handleBad} text="Bad"/>
            
            <Statistics
                Good={Feedback.Good}
                Neutral={Feedback.Neutral}
                Bad={Feedback.Bad}
                History={History}
            />
            
        </>
    )
}