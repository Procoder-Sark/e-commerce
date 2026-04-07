import { useState } from 'react';
import ClassComponent from './ClassComponent'
import FunctionalComponent from './FunctionalComponent';
import Products from './Products';
import Flexbox from './Flexbox';
import Login from './Login';
import Signup from './Signup';
import Parent from './parent'
import { Link, Outlet } from 'react-router';

function App() {

  const name = "sark";
  const [ showComponent, setShowComponent] = useState(true)
  return (
    <>
      {/* {showComponent ? <FunctionalComponent name={name}/> : null}
      <button onClick={() => setShowComponent(!showComponent)}>{(showComponent) ? "Hide" : "Show"}Component</button> */}

      {/* <Products/> */}
      {/* <Flexbox/> */}
      {/* <Login/> */}
      {/* <Signup/> */}

      <Link to= "">Home</Link><br/>
      <Link to= "Signup">signup</Link><br/>
      <Link to= "Flex">Flexbox</Link><br/>
      <Link to= "Login">login</Link><br/>
      <Link to= "Routing/m21?keyword=iphone">Routing</Link><br/>
      <Link to='Parent'>Parent</Link>
      <Outlet/>
    </>
  )
}

export default App
