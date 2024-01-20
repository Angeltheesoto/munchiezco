import React, { useContext, useState } from "react";
import "./card.styles.scss";
import { dataContext } from "../../context/dataContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({ products }) => {
  const { cart, setCart } = useContext(dataContext);

  const [chooseSize, setChooseSize] = useState(false);
  const [chosenItem, setChosenItem] = useState("");
  const [chosenSize, setChosenSize] = useState("small");

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

  const handleClick = (item) => {
    // console.log(`Product: ${item.image}`);
    setChosenItem(item);
    setChooseSize(true);
  };

  const handleGoBack = () => {
    setChosenItem("");
    setChooseSize(false);
  };

  const handleAddToCart = (item) => {
    let searchTitle = chosenItem.title;
    let searchSize = chosenSize;
    let itemExists = false;
    let cartItem =
      cart.length > 0
        ? cart.find((obj) => obj.id === item.id && obj.size === chosenSize)
        : null;

    // console.log(`Chosen size: `, chosenSize);
    // console.log(`Cart items:`, cart);
    // console.log(`Cart Item:`, cartItem);
    // console.log(`Item chosen`, item);

    if (item.quantity[chosenSize] === 0) {
      showToast("This size is sold out", "info");
      return;
    } else if (item?.quantity[chosenSize] > cartItem?.quantity || !cartItem) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].title === searchTitle && cart[i].size === searchSize) {
          cart[i].quantity = cart[i].quantity + 1;
          itemExists = true;
          break;
        }
      }

      if (!itemExists) {
        setCart((prev) => [
          ...prev,
          {
            id: item.id,
            title: searchTitle,
            size: searchSize,
            quantity: 1,
            image: item.image,
            price: item.price,
          },
        ]);
      }
      showToast(`Added ${searchTitle} to cart`, "success");
      localStorage.setItem("cart", JSON.stringify(cart));
      // console.log(itemExists);
    } else {
      showToast("Can't add anymore of this item.", "info");
      return;
    }
  };

  // console.log(cart);
  // console.log(`Card Component: ${products}`);

  return (
    <div className="card-container">
      {/* Displays all products */}
      {!chooseSize &&
        products.map((item) => (
          <div>
            {Object.values(item.quantity).reduce(
              (acc, value) => acc + value,
              0
            ) > 0 ? (
              <div
                className="card-item-container"
                onClick={() => handleClick(item)}
                key={item.title + item.size}
              >
                <img
                  src={item.image}
                  alt="product one"
                  className="card-image"
                />
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                </div>
                <button className="app-btn">Choose size</button>
              </div>
            ) : (
              <div className="card-item-container">
                <div className="card-sold-out">SOLD OUT</div>
                <img
                  src={item.image}
                  alt="product one"
                  className="card-image"
                />
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                </div>
                <button className="app-btn">Choose size</button>
              </div>
            )}
          </div>
        ))}

      {/* Displays chosen product */}
      {chooseSize && chosenItem !== "" ? (
        <div
          className="card-size-container"
          key={chosenItem.title + chosenSize}
        >
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

          <img
            src={chosenItem?.image}
            alt="product one"
            className="card-image"
          />
          <div className="card-size-subcontainer">
            <div>
              <h2>{chosenItem?.title}</h2>
              <p>{chosenItem?.desc}</p>
              <span className="app-price">${chosenItem?.price}</span>
            </div>
            <div className="card-size-btn-container">
              <p
                className={
                  chosenSize === "small"
                    ? "app-size-btn app-size-btn-checked"
                    : "app-size-btn"
                }
                onClick={() => setChosenSize("small")}
              >
                Small
                {/* {chosenItem.quantity["small"] === 0 && "sold out"} */}
              </p>
              <p
                className={
                  chosenSize === "medium"
                    ? "app-size-btn app-size-btn-checked"
                    : "app-size-btn"
                }
                onClick={() => setChosenSize("medium")}
              >
                Medium
              </p>
              <p
                className={
                  chosenSize === "large"
                    ? "app-size-btn app-size-btn-checked"
                    : "app-size-btn"
                }
                onClick={() => setChosenSize("large")}
              >
                Large
              </p>
            </div>
            <div>
              <button
                className="app-btn app-back-btn"
                onClick={() => handleGoBack()}
              >
                Go back
              </button>
              <button
                className="app-btn"
                onClick={() =>
                  handleAddToCart({
                    image: chosenItem.image,
                    price: chosenItem.price,
                    quantity: chosenItem.quantity,
                    id: chosenItem._id,
                  })
                }
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Card;
