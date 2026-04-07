import React from 'react'
import { Link, Outlet } from 'react-router'
import Signup from './Signup'

export const Child1 = () => {
    return(
        <div>Child1</div>
    )
}

export const Child2 = () => {
    return(
        <div>Child2</div>
    )
}

export const Child3 = () => {
    return(
        <div>Child3</div>
    )
}

export const Parent = () => {
    // relative(no / needed) vs absolute(/ needed) path
    return(
        <>
        <div>Parent</div>
        <Link to='child1'>Child1</Link>
        <Link to='child2'>Child2</Link>
        <Link to= 'child3'>Child3</Link>
        <Link to='/Signup'>Signup</Link>
        <Outlet/>
    </>
    )
}

export default Parent