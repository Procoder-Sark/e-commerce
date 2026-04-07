import React, { useReducer } from 'react'
import "./styles.scss"
import { Container, Row, Col, Card, Button, CardBody, CardFooter, CardHeader, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { ACTIONS, initialState, signupReducer } from '../Login/signupReducer'

const Signup = () => {

    const [state, dispatch] = useReducer(signupReducer, initialState)

    const isPasswordValid = [...Object.values(state.password.validations)].every(Boolean);

    return (
        <Container fluid>
            <Row>
                <Col sm= {{span: 10, offset: 1}} md= {{span:6, offset: 3}} lg= {{span: 4, offset:4}}>
                    <Card className='signup-card mt-5'>
                        <CardHeader>Signup</CardHeader>
                        <CardBody>
                             <FormGroup controlId='Name'>
                                <FormLabel>Name</FormLabel>
                                <FormControl onChange={(e)=> dispatch({ type: ACTIONS.NAME_CHANGE, payload: e.target.value })} placeholder='Enter Name'></FormControl>
                            </FormGroup>
                            <FormGroup controlId='username'>
                                <FormLabel>Username</FormLabel>
                                <FormControl onChange={(e) => dispatch({ type: ACTIONS.USERNAME_CHANGE, payload: e.target.value})} placeholder='Enter Username'></FormControl>
                            </FormGroup>
                             <FormGroup controlId='Email'>
                                <FormLabel>Email</FormLabel>
                                <FormControl onChange={(e) => dispatch({ type: ACTIONS.EMAIL_CHANGE, payload: e.target.value})} placeholder='Enter Email'></FormControl>
                            </FormGroup>
                            <FormGroup controlId='Password'>
                                <FormLabel>Password</FormLabel>
                                <FormControl onChange={(e) => dispatch({ type: ACTIONS.PASSWORD_CHANGE, payload: e.target.value})} placeholder='Enter Password'></FormControl>
                            </FormGroup>
                        </CardBody>
                        <CardFooter>
                            <Button variant='outline-primary'>Signup</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}

export default Signup