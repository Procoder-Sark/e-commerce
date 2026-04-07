import React, { useEffect, useState } from 'react'

const FunctionalComponent = () => {
    console.log("rendering is ongoing");
    
    const [count, setCount] = useState(0);
    const [num, setNum] = useState(0);

    const increment = () => {
       setNum( num+1);
    //    console.log(num);
       
    }

    useEffect(()=> {
       //componentDidMount
         console.log("useEffect without dependency");
    },[]);

       useEffect(()=> {
       //componentDidUpdate
         console.log("useEffect with dependency", count);
    },[count]);

      useEffect(()=> {
       //componentWillUnmount
         console.log("useEffect with dependency", count);

         return(
            console.log("unmounting is ongoing")
            
         )
    },[count]);

    return (
        <>
            <h2>state count: {count}</h2>
            <h2>num: {num}</h2>
            <button onClick={() => setCount( count + 1)}>update</button>
            <button onClick={increment}>click me</button>
        </>

    )
}

export default FunctionalComponent