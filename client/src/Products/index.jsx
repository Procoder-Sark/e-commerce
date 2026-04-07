import React, { useEffect, useState } from 'react'
import axios from "axios";
import Product from './Product/index'
import { Container, Row, Col } from 'react-bootstrap';


const Products = () => {
  const [products, setProducts] = useState([]);
  const URL = "https://fakestoreapi.com/products";

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(URL);
      setProducts(data);
      // console.log("The Data is:-" , data)
    })();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
            {products.map(product => <Product product={product} />)}
         </Row>
      </Container>
    </>
  )
}

export default Products