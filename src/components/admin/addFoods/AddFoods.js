import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "./AddFood.css"
import axios from "axios";
function AddFoods() {

    const [inputValue, setInputValue] = useState({
        foodName: "",
        restaurantName: "",
        foodDescription: "",
        price: "",
        foodImg: ""
    });

    const setValue = (e) => {
        const { name, value } = e.target;
        setInputValue(() => {
            return {
                ...inputValue,
                [name]: value,
            };
        });
    };

    return (
        <>
            <div className="food-form-container">
                <div className="form">
                    <Form className="mt-3">
                        <h3 className="m-4" style={{ color: "black" }}>Create Food</h3>
                        <Form.Group className="mb-3">
                            <Form.Control
                                className="formControl"
                                onChange={setValue}
                                value={inputValue.foodName}
                                name="foodName"
                                type="text"
                                placeholder="Enter Food Name"
                                autoComplete="off"
                            />
                        </Form.Group>
                        <Form.Group className="mt-5">
                            <Form.Control
                                className="formControl"
                                onChange={setValue}
                                value={inputValue.restaurantName}
                                name="restaurantName"
                                type="text"
                                placeholder="Enter Restuarant name"
                                autoComplete="off"

                            />
                        </Form.Group>

                        <div className="price">
                            <Form.Control
                                className="formControl"
                                onChange={setValue}
                                type="text"
                                value={inputValue.foodDescription}
                                name="foodDescription"
                                placeholder="Food Description"
                            />

                        </div>

                        <div className="price">
                            <Form.Control
                                className="formControl"
                                onChange={setValue}
                                type="text"
                                value={inputValue.price}
                                name="price"
                                placeholder="Enter the price"
                            />

                        </div>
                        <div className="" >
                            <Form.Group controlId="formFile" className="mb-3">
                                <input
                                    name="photo"
                                    accept=".png, .jpg, .jpeg"
                                    // onChange={setFileImg}
                                    type="file"
                                    id="uploadBtn"
                                />
                            </Form.Group>

                        </div>

                        <Button className="form-btn mt-3" type="submit">
                            Create Food
                        </Button>

                        {/* <div className="sign-to-login">
              <h6>
                Already have an account ?{" "}
                <Link className="to-login" to={"/login"}>
                  Login
                </Link>
              </h6>
            </div> */}
                    </Form>
                </div>
            </div>
        </>
    )
}

export default AddFoods