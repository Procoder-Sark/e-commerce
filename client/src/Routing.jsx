import React from 'react'
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router'

const Routing = () => {

  const {search, pathname} = useLocation();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  console.log(params);
  console.log(...searchParams);
  return (
    <>
    <div>Routing</div> 
    <div>{pathname}</div> 
    <div>{search}</div> 
    <div>{params.productid}</div> 

    <h3>SEARCH PARAMS</h3>
    <div>keywords:- {searchParams.get('keyword')}</div>
    <div>capacity:- {searchParams.get('capacity')}</div>

    <input type='text' onChange={(e) => setSearchParams({keyword: e.target.value})} />
    <input type='text' onChange={(e) => setSearchParams({capacity: e.target.value})} />

    <section className='mt-2'>
      <Button onClick={() => navigate('/login', {state : {from: pathname}})} variant='outline-primary'>go to login</Button>
    </section>
    </>
  )
}

export default Routing