/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from "react";
import "./cart.styles.scss";
import Layout from "../../components/shared/layout";
import Container from "react-bootstrap/esm/Container";
import { dataContext } from "../../context/dataContext";
import { Trash } from "react-bootstrap-icons";
import { createCheckout } from "../../api/billing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const Cart = () => {
  const { cart, setCart, data } = useContext(dataContext);
  const [total, setTotal] = useState(0);

  const showToast = (msg, emitter) => {
    if (emitter === "info") {
      toast.info(msg);
    } else if (emitter === "success") {
      toast.success(msg);
    } else if (emitter === "warning") {
      toast.warn(msg);
    } else if (emitter === "error") {
      toast.error(msg);
    } else {
      toast(msg);
    }
  };

  const findItemIndex = (item) => {
    let searchTitle = item.title;
    let searchSize = item.size;
    let foundItem = null;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].title === searchTitle && cart[i].size === searchSize) {
        foundItem = i;
        break;
      }
    }

    return foundItem;
  };

  const handleDeleteItem = (item) => {
    const itemToDelete = findItemIndex(item);

    if (itemToDelete !== null) {
      setCart((prev) => {
        const newCart = [...prev];
        newCart.splice(itemToDelete, 1);
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });
    }
  };

  const handleIncreaseCount = (item) => {
    let itemToIncrease = findItemIndex(item);
    let cartItemAmount = item.quantity;
    let inventory = data.find((obj) => obj._id === item.id);
    // console.log(inventory);
    // ?Checks if the inventory has the amount to add more.
    if (inventory.quantity[item.size] > cartItemAmount) {
      if (itemToIncrease !== null) {
        setCart((prev) => {
          const newCart = [...prev];
          newCart[itemToIncrease].quantity += 1;
          localStorage.setItem("cart", JSON.stringify(newCart));
          return newCart;
        });
      }
    } else {
      showToast("Can't add anymore of this item.", "info");
      return;
    }
  };

  const handleDecreaseCount = (item) => {
    let itemToDecrease = findItemIndex(item);

    if (itemToDecrease !== null) {
      setCart((prev) => {
        const newCart = [...prev];
        if (newCart[itemToDecrease].quantity === 1) {
          handleDeleteItem(item);
        }
        if (
          newCart[itemToDecrease].quantity !== 1 &&
          newCart[itemToDecrease].quantity > 0
        ) {
          newCart[itemToDecrease].quantity -= 1;
        }
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });
    }
  };

  const handleCheckout = async () => {
    try {
      if (cart.length === 0 || !cart) {
        showToast("You have no items in your cart.", "info");
        return;
      }
      const client_url = process.env.REACT_APP_CLIENT_URL;
      const userCredentials = {
        items: cart,
        success_url: `${client_url}success`,
        cancel_url: `${client_url}cart`,
      };
      const res = await createCheckout(userCredentials);
      // set checkout_session_id in localstorage to res.sessionId
      localStorage.setItem("checkout_session_id", res.sessionId);
      window.location = res.url;
    } catch {
      console.error(`Could not create checkout session`);
    }
  };

  useEffect(() => {
    //   console.log(cart);
    const addTotalInCart = () => {
      let sum = 0;
      for (let i = 0; i < cart.length; i++) {
        // console.log(cart[i].price);
        const curr = cart[i];
        const currPrice = Number(curr.price) * Number(curr.quantity);
        sum += currPrice;
      }
      return sum.toFixed(2);
    };
    let myTotal = addTotalInCart();
    setTotal((prev) => (prev = myTotal));
  }, [cart]);

  // console.log(cart);

  return (
    <Layout>
      <Helmet>
        <title>Cart Page</title>
        <meta
          name="description"
          content="This page is where users can store all items they wish to buy in a cart."
        />
      </Helmet>
      <Container>
        <div className="cart-container">
          <ToastContainer
            position="top-center" // You can set the position here
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover={true}
            theme="light"
          />
          <h1>Cart</h1>
          {cart.length === 0 && <h5>Your cart is empty</h5>}
          {cart.map((item) => (
            <div className="cart-item" key={item.title + item.size}>
              <img src={item.image} alt={item.title} className="me-5" />
              <div className="d-flex align-items-center justify-content-center flex-column">
                <h2>{item.title}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
                <p>Price: ${item.price} / each</p>
                <div>
                  <button
                    className="app-btn me-2"
                    onClick={() => handleDecreaseCount(item)}
                  >
                    -
                  </button>
                  <button
                    className="app-btn"
                    onClick={() => handleIncreaseCount(item)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center ms-3 cart-trash">
                <Trash
                  size={30}
                  color="red"
                  className="cart-trash-icon"
                  onClick={() => handleDeleteItem(item)}
                />
              </div>
            </div>
          ))}
          <div className="d-flex align-items-start justify-content-start">
            <h4>Total:</h4>
            <span className="cart-total">${total ? total : 0}</span>
          </div>
          <button className="app-back-btn" onClick={() => handleCheckout()}>
            Checkout
          </button>
        </div>
      </Container>
    </Layout>
  );
};

export default Cart;
