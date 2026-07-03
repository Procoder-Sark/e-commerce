import React, { useState } from 'react'
import "./styles.scss"
import { Container, Row, Col, Card, Button, CardBody, CardFooter, CardHeader, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useLocation } from 'react-router'
import { axiosInstance, ENDPOINTS, REQUEST_TYPES } from '../apiUtils'
import useApi from '../useApi'

const Login = () => {
    const {state} = useLocation();
    console.log(state);
    const { isLoading, makeRequest } = useApi(ENDPOINTS.USER.LOGIN, REQUEST_TYPES.POST);

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const onLogin = async () => {
        const payload = {
            username,
            password,
        };
        // make api call to login endpoint
        // const response = await axiosInstance.post(ENDPOINTS.USER.LOGIN, payload);
        await makeRequest(payload);
        
        setPassword('');
        setUsername('');
    };

    const isValid = username && password;
    
    return (
        <Container fluid>
            <Row>
                <Col sm= {{span: 10, offset: 1}} md= {{span:6, offset: 3}} lg= {{span: 4, offset:4}}>
                    <Card className='login-card mt-5'>
                        <CardHeader>Login</CardHeader>
                        <CardBody>
                            <FormGroup controlId='username'>
                                <FormLabel>Username</FormLabel>
                                <FormControl value={username} onChange={e => setUsername(e.target.value)} placeholder='Enter Username'></FormControl>
                            </FormGroup>
                            <FormGroup controlId='Password'>
                                <FormLabel>Password</FormLabel>
                                <FormControl value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter Password'></FormControl>
                            </FormGroup>
                        </CardBody>
                        <CardFooter>
                            <Button disabled={!isValid} variant='outline-primary' onClick={onLogin}>Login</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}

export default Login