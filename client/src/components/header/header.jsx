import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./header.styles.scss";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/logo.png";
import { Bag } from "react-bootstrap-icons";
import { useContext, useEffect, useState } from "react";
import { dataContext } from "../../context/dataContext";

function Header() {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(dataContext);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    const getCartLength = () => {
      let myCartLength = 0;
      for (let i = 0; i < cart.length; i++) {
        myCartLength += cart[i].quantity;
      }
      return myCartLength;
    };
    setCartLength(getCartLength());
  }, [cart]);
  // console.log(cart.length);

  return (
    <Navbar
      expand="md"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
      // style={{ height: "4rem" }}
    >
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} href="#top">
          <img
            src={Logo}
            alt="logo"
            width={"50px"}
            height={"auto"}
            className="header-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-drpdwn">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")} href="#top">
              {" "}
              Home
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/")} href="#products">
              Products
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/")} href="#about">
              About
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end align-items-center "></Nav>
          <Nav className="justify-content-end align-items-center header-bag">
            <Bag
              color="white"
              size="30px"
              className="header-cart"
              onClick={() => navigate("/cart")}
            />
            {cartLength > 0 && (
              <span className="header-cart-count">{cartLength}</span>
            )}
          </Nav>
        </Navbar.Collapse>
        <div className="header-bag-mobile">
          <Bag
            color="white"
            size="30px"
            className="header-cart"
            onClick={() => navigate("/cart")}
          />
          {cartLength > 0 && (
            <span className="header-cart-count">{cartLength}</span>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
