import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ADD_PRODUCT_BASKET } from "../../actions/types";
import ConvertPrice from "../../routes/ConvertPrice";
import Header from "../views/Header";

function Details({ location }) {
  const [size, setSize] = useState("S");
  let sizes = ["S", "M", "L", "XL"];
  const dispatch = useDispatch();
  const product = location.state;

  return (
    <div className="detail-page">
      <Header />

      <Container>
        <Row className="product-detail-wrapper">
          <Col lg="7" md="7" sm="7" xs="7" id="image-product">
            <img src={product.image} alt="" />
          </Col>

          <Col lg="5" md="5" sm="5" xs="5" id="detail-product">
            <div className="product-title">
              <h1> {product.name} </h1>
              <span>Mã sản phẩm: {product.id} </span>
            </div>
            <div className="product-price">
              {product.priceDiscount ? (
                <div>
                  <span>Giá: {ConvertPrice(product.priceDiscount)} </span>
                  <span className="price-discount">
                    {ConvertPrice(product.price)}
                  </span>
                </div>
              ) : (
                <span>{ConvertPrice(product.price)}</span>
              )}
            </div>

            <div className="size">
              <span className="title-size">Chọn size</span>
              <Form.Group
                className="list-size"
                defaultValue={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <Form.Control as="select" size="lg">
                  {sizes.map((size, index) => {
                    return (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </div>

            <div
              onClick={() =>
                dispatch({
                  type: ADD_PRODUCT_BASKET,
                  payload: product,
                  size: size,
                })
              }
              className="btn-add-cart"
            >
              Thêm vào giỏ
            </div>
          </Col>
          <div className="intro">
            <h3>Giới thiệu</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Details;
