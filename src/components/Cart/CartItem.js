import React from "react";

export default function CartItem(props) {
  const { id, title, img, price, total, count } = props.item;
  const { increment, decrement, removeItem } = props.value;

  return (
    // ROW css: margin-top-and-bottom:2 text:cap text:center
    <div className="row my-2 text-capitalize text-center">
      {/* FIRST ITEM: product image */}
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={img}
          alt="product image"
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid"
        />
      </div>

      {/* SECOND ITEM: product name */}
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product: </span>
        {title}
      </div>

      {/* THIRD ITEM: product price */}
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price: </span>${price}
      </div>

      {/* FOURTH ITEM: count */}
      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
        <div className="d-flex justify-content-center">
          <div>
            <span className="btn btn-black mx-1" onClick={() => decrement(id)}>
              -
            </span>
            <span className="btn btn-black mx-1">{count}</span>
            <span className="btn btn-black mx-1" onClick={() => increment(id)}>
              +
            </span>
          </div>
        </div>
      </div>

      {/* FIFTH ITEM: remove item */}
      <div className="col-10 mx-auto col-lg-2">
        <div className="cart-icon" onClick={() => removeItem(id)}>
          <i className="fas fa-trash" />
        </div>
      </div>

      {/*SIXTH ITEM: product price total */}
      <div className="col-10 mx-auto col-lg-2">
        <strong>item total: $</strong>
        {total}
      </div>
    </div>
  );
}
