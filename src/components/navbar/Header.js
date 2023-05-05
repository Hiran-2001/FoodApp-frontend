import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Badge from "@mui/material/Badge";
import Nav from "react-bootstrap/Nav";
import Menu from "@mui/material/Menu";
import { NavLink } from "react-router-dom";
import mtcart from "../../assets/cart-empty.png";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/esm/Table";
import { removeFromCart } from "../../Redux/cartRedux";
import { useEffect } from "react";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import "./Header.css";
function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const products = useSelector((store) => store.cart.products);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();

  const removeCart = (id) => {
    dispatch(removeFromCart(id));
  };

  console.log(products);

  const total = () => {
    let price = 0;
    products.map((e) => {
      return (price = e.price * e.quantity + price);
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  });
  return (
    <div>
      <Navbar className="header">
        <Container>
          <NavLink to="/" className="text-decoration-none text-dark">
            Foodie
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-dark ml-4">
             
            </NavLink>
          </Nav>

          <NavLink
            id="login-link"
            style={{ textDecoration: "none" }}
            to={`/login`}
          >
            {" "}
            <Button
              id="login-btn"
              style={{ marginRight: 15, color: "black" }}
              variant="text"
            >
              Log in
            </Button>
          </NavLink>
          <NavLink
            id="signin-link"
            style={{ textDecoration: "none" }}
            to={`/signin`}
          >
            <Button
              id="sign-btn"
              style={{ marginRight: 35, color: "black" }}
              variant="text"
            >
              Sign in
            </Button>
          </NavLink>

          <Badge
            badgeContent={products.length}
            color="warning"
            id="cart-icon"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            
          >
            <i
            
              className="fa-solid fa-cart-shopping text-dark"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
          <NavLink to={"/profile"}>
            <Avatar
              id="avatar-link"
              // src="/static/images/avatar/1.jpg"
              sx={{ width: 35, height: 35 }}
            />
          </NavLink>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {products.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <th>Photo</th>
                  <th>Restarant Name</th>
                </thead>
                <tbody>
                  {products.map((e) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                              <img
                                src={e.imgdata}
                                style={{ width: "5rem", height: "5rem" }}
                                alt=""
                              />
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.rname}</p>
                            <p>Price : ₹ {e.price}</p>
                            <p>Quantity : {e.quantity}</p>
                            <p onClick={() => removeCart(e.id)}>
                              <i
                                style={{
                                  color: "red",
                                  fontSize: "25px",
                                  cursor: "pointer",
                                }}
                                className="fas fa-trash smalltrash"
                              ></i>
                            </p>
                          </td>
                          
                        </tr>
                      </>
                    );
                  })}
                  <p className=" text-center pt-3">Total : ₹ {price}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: "24rem", padding: 10, position: "relative" }}
            >
              <i
                className="fas fa-close"
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "45px",
                  fontSize: 23,
                  cursor: "pointer",
                }}
                onClick={handleClose}
              ></i>
              <p>Your cart is empty</p>
              <img
                style={{ height: "100px", width: "100px", margin: "0px 25px" }}
                src={mtcart}
                alt=""
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </div>
  );
}

export default Header;
