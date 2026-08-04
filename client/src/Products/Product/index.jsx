import React, { useContext } from 'react'
import {UserContext} from '../../UserContextProvider';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, CardImg, Col } from 'react-bootstrap';
import './styles.scss'
import { Rating } from 'react-simple-star-rating';
import { BagCheckFill, BagPlusFill } from 'react-bootstrap-icons';
import CartCounter from './CartCounter';
import { useLocation, useNavigate } from 'react-router';
import useApi from '../../useApi';
import { ENDPOINTS, REQUEST_TYPES} from '../../apiUtils';

const Product = ({ product }) => {

  const { userData, isLoading } = useContext(UserContext);
  // console.log("The userData is:-", userData);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { makeRequest: makeAddToCartReq } = useApi(ENDPOINTS.CART.ADD_TO_CART, REQUEST_TYPES.POST);
  const { makeRequest: makeRemoveFromCartReq } = useApi(ENDPOINTS.CART.REMOVE, REQUEST_TYPES.DELETE);
  const { makeRequest: makeIncrementReq } = useApi(ENDPOINTS.CART.INCREMENT, REQUEST_TYPES.PATCH);
  const { makeRequest: makeDecrementReq } = useApi(ENDPOINTS.CART.DECREMENT, REQUEST_TYPES.PATCH);

  const { id, title, price, image, description, rating } = product || {};

  // const productInfo = cart?.find(p => p.id === product.id);

  const cart = userData?.cart?.items;
  const productInfo = cart?.find(p => p.id === id);
  console.log("The productInfo is:-", productInfo);
  


  const onIncrement = () => {
    if(isLoading) return
    makeIncrementReq(product, true);
  }

    const onDecrement = () => {
    if(isLoading) return
    makeDecrementReq(product, true);
  }

    const onAddToCart = () => {
    if(!userData) {
      return navigate('/login', {
        state: pathname,
        replace: true,
      });
    }
    makeAddToCartReq(product, true);
     
  }
  // console.log("Updated userData:", userData);

    const onRemoveFromCart = () => {
    if(isLoading) return
    makeRemoveFromCartReq(product, true);
  }

//   console.table(userData?.cart?.items);
// console.log("Current Product ID:", id);



  // <section style={{border: "1px solid", marginBottom: "5px"}}></section>
  return (
    <Col className="image" xs={{ span: 10, offset: 1 }} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 0 }} xl={{ span: 3 }} >
      <Card className='product-card mb-3'>
        <CardHeader className='title'>{title}</CardHeader>
        <CardImg src={image} variant='top' className='image p-2' />
        <CardBody>
          <section className='content'>
            <section className='text price'>${price}</section>
            <section className='text description'>{description}</section>
          </section>
          <section className='d-flex align-items-end'>
            <Rating readonly initialValue={rating.rate} allowFraction size={25} />
            <Badge pill className='ms-2'>{rating.count}</Badge>
          </section>
        </CardBody>
        <CardFooter>
          { productInfo ? <CartCounter quantity ={productInfo.quantity} onIncrement={onIncrement} onDecrement={onDecrement} onRemove={onRemoveFromCart} />: 
          <Button onClick={onAddToCart} disabled = {isLoading}  variant='outline-primary' className='d-flex align-items-centre'>
            <BagPlusFill size={25} className='me-2' />
            Add to cart
            </Button>}
          
        </CardFooter>
      </Card>
    </Col>
  )
}

export default Product