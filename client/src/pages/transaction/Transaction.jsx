import React, { useContext, useEffect, useState } from "react";
import "./transaction.styles.scss";
import Layout from "../../components/shared/layout";
import { dataContext } from "../../context/dataContext";
import { sessionDataCall, updateMongoDBCall } from "../../api/billing";
import Container from "react-bootstrap/esm/Container";

const Transaction = () => {
  const { cart, setCart, fetchProductData } = useContext(dataContext);
  const searchParams = new URLSearchParams(window.location.search);
  const session_id = searchParams.get("session_id");
  const [sessionDetails, setSessionDetails] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prevCart, setPrevCart] = useState(null);

  useEffect(() => {
    setPrevCart(cart ? cart : null);
    const fetchPlan = async () => {
      const sessionData = await sessionDataCall({
        sessionId: session_id,
      });

      if (cart.length > 0) {
        await updateMongoDBCall({
          sessionId: session_id,
          items: cart,
        });
      }

      // console.log(sessionData);

      const amountTotal = sessionData.amount_total;
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      const formattedAmountTotal = formatter.format(amountTotal / 100); // Convert from cents to dollars
      // console.log(formattedAmountTotal);
      if (formattedAmountTotal) {
        setTotal(formattedAmountTotal);
      }

      if (sessionData) {
        setSessionDetails(sessionData.payment_status);
      }

      // Set cart items to empty array
      setCart((prev) => (prev = []));
      localStorage.setItem("cart", JSON.stringify([]));

      fetchProductData();

      setLoading(false);
    };

    fetchPlan();
  }, []);

  // console.log("status: " + sessionDetails);
  return (
    <Layout>
      <div className="transaction-container cart-item">
        <Container>
          {loading && <h2>Loading payment status..</h2>}
          {!loading && sessionDetails && sessionDetails === "paid" && (
            <div>
              <h2>Your payment was successful.</h2>
              <h3>Purchased Items:</h3>
              {/* {cart.map((item) => ( */}
              {prevCart?.map((item) => (
                <div className="cart-item" key={item.title}>
                  <img src={item.image} alt={item.title} className="me-5" />
                  <div className="d-flex align-items-center justify-content-center flex-column">
                    <h2>{item.title}</h2>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                    <p>Price: ${item.price} / each</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center ms-3 cart-trash"></div>
                </div>
              ))}
              <h3>Total: {total}</h3>
            </div>
          )}
          {!loading && sessionDetails && sessionDetails === "unpaid" && (
            <div>
              <h2>Your payment failed.</h2>
            </div>
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default Transaction;
