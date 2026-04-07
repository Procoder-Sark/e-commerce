import React from 'react'
import { Col } from 'react-bootstrap';
import './styles.css'

const Product = ({ product }) => {

  const { title, price, image } = product || {};

  // <section style={{border: "1px solid", marginBottom: "5px"}}></section>
  return (
    <Col className="image" xs={{span:10, offset:1}} md={{span:5, offset:1}} lg={{span:4, offset:0}} xl={{span:3}} >
      <img src={image} loading="lazy" height='200px' />
      <section>
        title:- {title}
      </section>
      price:- {price}
    </Col>
  )
}

export default Product