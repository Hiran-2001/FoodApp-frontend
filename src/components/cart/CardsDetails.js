import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { ADD_TO_CART, DLT, RMV_QNTY } from "../../Redux/actions/action";
import {
  decreaseQnty,
  increaseQnty,
  removeFromCart,
} from "../../Redux/cartRedux";
import "./CardsDetails.css";
function CardsDetails() {
  const [data, setData] = useState([]);
  const products = useSelector((store) => store.cart.products);
  // console.log(getData);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(id);

  const compareData = () => {
    let compare = products.filter((e) => {
      return e.id == id;
    });
    setData(compare);
  };
  // // console.log(data);

  useEffect(() => {
    compareData();
  },[]);

  console.log(products);

  const dlt = (id) => {
    dispatch(removeFromCart(id));
    navigate("/");
  };

  const dczQnt = (id) => {
    dispatch(decreaseQnty(id));
  };

  const incQnt = (id) => {
    dispatch(increaseQnty(id));
  };
  console.log();
  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Items Details page</h2>
        <section className="container">
          <div className="itemsdetails">
            {data.map((ele) => {
              return (
                <div id="cart-card">
                  <div className="items_img">
                    <img
                      id="cart-img"
                      src={ele.imgdata}
                      alt=""
                    />
                  </div>
                  <div className="details">
                    <Table>
                      <tr style={{ marginLeft: "20px", marginTop: "0px" }}>
                        <td>
                          <p>
                            <strong>Restaurant</strong> : {ele.rname}
                          </p>
                          <p>
                            <strong>Price</strong> : ₹ {ele.price}
                          </p>
                          <p>
                            <strong>Dishes</strong> : {ele.address}
                           
                          </p>
                          <p>
                            <strong>Total</strong> : ₹{" "}
                            {ele.price * ele.quantity}
                          </p>
                        </td>

                        <td style={{ marginLeft: "20" }}>
                          <p>
                            <strong>Rating:</strong>
                            <span
                              style={{
                                background: "green",
                                color: "white",
                                padding: "2px 6px",
                                borderRadius: "5px",
                                marginLeft: "5px",
                              }}
                            >
                              {ele.rating}★
                            </span>
                          </p>
                          <p>
                            <strong>Order Review:</strong>
                            <span>{ele.somedata}</span>
                          </p>
                          <p>
                            <strong>Remove:</strong>
                            <span
                              style={{
                                color: "red",
                                fontSize: "15px",
                                cursor: "pointer",
                                marginLeft: "10px",
                              }}
                              onClick={() => {
                                dlt(ele.id);
                              }}
                            >
                              <i className="fas fa-trash "></i>
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>

                    {/* button  */}

                    <div
                      style={{
                        marginBottom: 30,
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <div
                        id="counter"
                        className=" primary mt-3 d-flex justify-content-between align-item-center"
                        style={{
                          width: 100,
                          height: 40,
                          color: "white",
                          backgroundColor: "#0d6efd ",
                          cursor: "pointer",
                          borderRadius: "20px",
                        }}
                      >
                        <button
                          style={{
                            fontSize: 24,
                            border: "none",
                            backgroundColor: "#0d6efd ",
                            // backgroundColor:"Red",
                            borderRadius: "15px 0px 0px 15px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          onClick={() => dczQnt(ele.id)}
                        >
                          -
                        </button>
                        <span style={{ fontSize: 18, marginTop: 8 }}>
                          {ele.quantity}
                        </span>
                        <button
                          style={{
                            fontSize: 24,
                            border: "none",
                            backgroundColor: "#0d6efd ",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "20px",
                          }}
                          onClick={() => {
                            incQnt(ele.id);
                          }}
                        >
                          +
                        </button>
                      </div>

                      <div
                        id="counter"
                        className=" primary mt-3 d-flex justify-content-between align-item-center"
                        style={{
                          width: 100,
                          color: "white",
                          backgroundColor: "#0d6efd ",
                          cursor: "pointer",
                          borderRadius: "20px",
                          marginTop: "20px",
                        }}
                      >
                        <button
                          style={{
                            fontSize: 14,
                            border: "none",
                            backgroundColor: "#0d6efd",
                            color: "white",
                            borderRadius: "20px",
                            textAlign: "center",
                            paddingLeft: 12,
                          }}
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

export default CardsDetails;
