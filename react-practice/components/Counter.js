'use client'

export default function Counter(props) {
    // const [count, setCount] = useState(0);
    // const handleClick = () => {
    //     setCount(count + 1)
    //     // count += 1 (not allowed)
    // }

    const { count, handleClick } = props
    
    return (
        <div>
            <p>{count}</p>
            <button onClick={handleClick}>plus</button>
        </div>
    )
}