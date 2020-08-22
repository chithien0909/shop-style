import React from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import img from '../../img/women.png';

import { Container, Row, Col} from 'react-bootstrap';

function Women() {
  return(
    <Container fluid>
      <div className="category">
        <div className="product-wrapper">
          <Row>
            <Col className="col-img" xl={4} lg={4} data-aos="slide-left">
              <img alt="" src={img} />
            </Col>
            <Col className="col-intro" xl={8} lg={8} md={12} sm={12} xs={12} data-aos="slide-right">
              <div className="intro-product">
                <h1>Welcome to the women's world clothes</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, expedita?</p>
              </div>
              <Link to="/women" className="btn">Buy now</Link>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  )
}
AOS.init({
  offset: 400,
  duration: 1000
});
export default Women;