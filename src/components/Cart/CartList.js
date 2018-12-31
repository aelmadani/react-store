import React from "react";
import CartItem from "./CartItem";

export default function CartList(props) {
  const cart = props.value.cart;
  console.log(cart);
  return (
    <div className="container-fluid">
      {cart.map(item => {
        return <CartItem key={item.id} item={item} value={props.value} />;
      })}
    </div>
  );
}

// The selected props:
// item: info of the selected item: product name, price, total etc.
// value: only for grabbing the increment, decrement, removeitem from context.
