import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
  state = {
    products: [], // hvis vi indsætter storeProducts her,
    //vil den ikke kopiere ind, men der vil dannes reference af den hvilket er et problem.
    // Derfor er løsningen at man starter med en tom array, og derefter kører setProducts metoden.
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0
  };
  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item }; // sådan undgår vi at der bruges referencer istedet for kopier.
      tempProducts = [...tempProducts, singleItem]; // her indsætter vi den nye item ind via ...
    });
    this.setState({ products: tempProducts });
  };
  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState({ detailProduct: product });
  };

  addToCart = id => {
    let tempProducts = [...this.state.products]; // first step is to copy the products from this.state.
    const index = tempProducts.indexOf(this.getItem(id)); // then we find index of clicked item
    const product = tempProducts[index]; // then point at the item we want to change
    product.inCart = true; // changing inCart
    product.count = 1; // changing count
    product.total = product.price; // changing total

    // the second argument in setstate is a CALLBACK. Meaning each time state has updated, the second
    // argument (method) will be called. So each time  we add a new product to cart,
    // state updates AND addTotals is called!!!
    this.setState(
      {
        products: tempProducts,
        cart: [...this.state.cart, product]
      },
      () => this.addTotals()
    );
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState({
      modalProduct: product,
      modalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false
    });
  };

  increment = id => {
    let tempCart = [...this.state.cart]; // copy (not reference) of cart
    const selectedItem = tempCart.find(item => item.id === id); // find selected item from cart
    //const index = tempCart.indexOf(selectedItem); // index of selected item
    //const product = tempCart[index];
    //product.count = product.count + 1;
    //product.total = product.count * product.price;

    selectedItem.count = selectedItem.count + 1;
    selectedItem.total = selectedItem.count * selectedItem.price;
    this.setState(
      {
        cart: [...tempCart]
      },
      () => this.addTotals()
    );
  };

  decrement = id => {
    let tempCart = [...this.state.cart]; // copy (not reference) of cart
    const selectedItem = tempCart.find(item => item.id === id); // find selected item from cart

    selectedItem.count = selectedItem.count - 1;
    if (selectedItem.count === 0) {
      this.removeItem(id);
    } else {
      selectedItem.total = selectedItem.count * selectedItem.price;
      this.setState(
        {
          cart: [...tempCart]
        },
        () => this.addTotals()
      );
    }
  };

  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter(item => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedItem = tempProducts[index];

    removedItem.inCart = false;
    removedItem.count = 0;
    removedItem.total = 0;

    this.setState(
      {
        cart: [...tempCart],
        products: [...tempProducts]
      },
      () => this.addTotals()
    );
  };

  // When we want to clear the cart, its not enough to set cart equal to empty array in state.
  // Because the inCart property of the chosen products will still be TRUE.
  // So the best solution, is to add a callback where we call the setProducts method, to copy in
  // a new set of producrs
  clearCart = () => {
    this.setState({ cart: [] }, () => {
      this.setProducts();
      this.addTotals();
    });
  };

  addTotals = () => {
    let subTot = 0;
    this.state.cart.map(item => (subTot = subTot + item.total));
    const tax = parseFloat((subTot * 0.25).toFixed(2));
    const tot = subTot + tax;
    this.setState({
      cartSubtotal: subTot,
      cartTax: tax,
      cartTotal: tot
    });
  };

  render() {
    return (
      <ProductContext.Provider
        // vi sender state og methods herfra, kan bruges der hvor consumer bliver kaldt
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
