import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const {
            id,
            company,
            img,
            info,
            price,
            title,
            inCart
          } = value.detailProduct;
          return (
            <div className="container py-5">
              {/* Title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{title}</h1>
                </div>
              </div>
              {/* end Title*/}
              {/* Product info */}
              <div className="row">
                {/* Product IMAGE */}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize ">
                  <img src={img} alt="product" className="img-fluid" />
                </div>
                {/* Product TEXT */}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize ">
                  <h2>model: {title}</h2>
                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                    made by: <span className="text-uppercase">{company} </span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>price: ${price}</strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    Information:
                  </p>
                  <p className="text-muted lead">{info}</p>
                  <div className="">
                    <Link to="/">
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id); // run addToCart method from context.js
                        value.openModal(id); // run openModal method from context.js
                      }}
                      cart
                    >
                      {inCart ? "in Cart" : "add to Cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
