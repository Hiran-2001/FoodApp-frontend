import React, { useState, useEffect } from "react";
import "./Profile.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import sampleImg from "../../assets/bg-img.jpg";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
function Profile() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [proImg, setProImg] = useState("");
  const [userImage, setUserImage] = useState("");

  // console.log(userImage);
  // console.log(proImg);


  const setFileImg = (e) => {
    const file = e.target.files[0];
    console.log(file);
    TransFormFile(file)
    // setFileToBase(file)
    // setProImg(e.target.files[0]);
  };

  const TransFormFile = (file) => {

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProImg(reader.result)
      };
    } else {
      setProImg("")
    }
  }


  // console.log(proImg);

  // validating user

  const userValidate = async () => {
    const token = localStorage.getItem("usertoken");
    const res = await axios.get("http://localhost:4000/api/v1/validate_user", {
      headers: { Authorization: token },
    });

    if (res.status !== 201 || !res) {
      navigate("*");
    } else {
      setUser(res.data.validateUser);
      setUserImage(res.data.validateUser.userImage.url)
      navigate("/profile");
      // console.log(res);

    }
  };

  // console.log(user);
  //logout handler

  const logoutUser = async () => {
    const token = localStorage.getItem("usertoken");
    const res = await axios.get("https://bloodyspice-api.onrender.com/api/v1/logout_user", {
      headers: { Authorization: token },
      credentials: "include",
    });

    if (res.status === 201 || !res) {
      navigate("/home");
      localStorage.removeItem("usertoken");
      setUser(false);
    } else {
      console.log("error");
    }
  };

  //delete account handler

  const deleteAccount = async () => {
    const id = user._id;
    try {
      const res = await axios.delete(`https://bloodyspice-api.onrender.com/api/v1/delete/user/${id}`);
      if (res.status === 201) {
        console.log("user has been deleted");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(user._id);
  };

  //add user image\



  // adding image

  const addImage = async () => {
    const id = user._id;

    const token = localStorage.getItem("usertoken");
    // const formData = new FormData();
    // formData.append("image", proImg);
    // console.log(user);
    axios
      .put(
        `http://localhost:4000/api/v1/image_upload/${id}`,

        { image: proImg },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    userValidate();
  }, []);

  return (
    <>
      <div id="profile-main">
        <div className="profile-pic-div">
          <Card
            id="profileCard"
            style={{
              // marginTop: "3rem",
              display: "flex",
              alignItems: "center",
              border: "none",
            }}
          >
            <Card.Img
              variant="top"
              src={userImage}
              id="profile_image"
            />
            <button
              id="file-upload-btn"
              style={{ border: "none", marginLeft: 150, marginTop: -40 }}
            >
              <input
                name="photo"
                accept=".png, .jpg, .jpeg"
                onChange={setFileImg}
                type="file"
                id="uploadBtn"
              />
              <label htmlFor="uploadBtn">
                <BsFillPlusCircleFill id="upload-btn" />
              </label>
            </button>
            <Card.Body>
              <Card.Title style={{ textAlign: "center", marginTop: "1rem" }}>
                Hello {user.name}
              </Card.Title>
              <Button
                onClick={addImage}
                style={{ backgroundColor: "red", border: "none " }}
                id="change-image"
              >
                Change Image
              </Button>
            </Card.Body>
          </Card>
          <div
            style={{ marginTop: "3rem", width: "20rem", height: "3rem" }}
            id="logout-delete-acc-div"
          >
            <Button
              onClick={logoutUser}
              style={{ backgroundColor: "red", width: "6rem", border: "none" }}
            >
              Logout
            </Button>
            <Button
              onClick={deleteAccount}
              style={{ backgroundColor: "red", border: "none" }}
            >
              Delete Account
            </Button>
          </div>
        </div>

        {/* user details div */}

        <div id="user-details" className="">
          <Card border="light" id="user_details_card">
            <Card.Header
              style={{
                backgroundColor: "white",
                borderRadius: "20px 20px 0px 0px",
              }}
            >
              Personal Information
            </Card.Header>
            <Card.Body>
              {/* user name card div  */}

              <div
                style={{ display: "flex", justifyContent: "space-evenly" }}
                className="user-name"
              >
                <Card.Title id="user_name" style={{ marginTop: "1.5rem" }}>
                  Full Name
                </Card.Title>
                <div className="textContainer" style={{ width: "20rem" }}>
                  <Form.Text
                    style={{
                      marginTop: "1.5rem",
                      marginLeft: "2.5rem",
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    {user.name}
                  </Form.Text>
                </div>

                <NavLink to={`/profile/update/${user._id}`}>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                    }}
                  >
                    <MdModeEditOutline style={{ width: 20, height: 20 }} />
                  </button>
                </NavLink>
              </div>

              {/* user email card div  */}

              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="user-email"
              >
                <Card.Title style={{ marginTop: "1.5rem" }}>Email</Card.Title>
                <div
                  className="textContainer"
                  style={{ width: "15rem", marginLeft: 44 }}
                >
                  <Form.Text
                    style={{
                      marginTop: "1.5rem",
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    {user.email}
                  </Form.Text>
                </div>

                <NavLink to={`/profile/update/${user._id}`}>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                    }}
                  >
                    <MdModeEditOutline style={{ width: 20, height: 20 }} />
                  </button>
                </NavLink>
              </div>

              {/* user number card div  */}

              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="user-number"
              >
                <Card.Title style={{ marginTop: "1.5rem" }}>
                  Phone No
                </Card.Title>
                <div
                  className="textContainer"
                  style={{ width: "15rem", marginLeft: 1 }}
                >
                  <Form.Text
                    style={{
                      marginTop: "1.5rem",
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    {user.phoneNumber}
                  </Form.Text>
                </div>

                <NavLink to={`/profile/update/${user._id}`}>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                    }}
                  >
                    <MdModeEditOutline style={{ width: 20, height: 20 }} />
                  </button>
                </NavLink>
              </div>

              {/* address  */}

              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="user-number"
              >
                <Card.Title style={{ marginTop: "1.5rem" }}>Address</Card.Title>
                <div
                  className="textContainer"
                  style={{ width: "15rem", marginLeft: 20 }}
                >
                  <Form.Text
                    style={{
                      marginTop: "1.5rem",
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    {user.address}
                  </Form.Text>
                </div>

                <NavLink to={`/profile/update/${user._id}`}>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                    }}
                  >
                    <MdModeEditOutline style={{ width: 20, height: 20 }} />
                  </button>
                </NavLink>
              </div>

              {/* password change button  */}

              <button
                id="change_password"
               
              >
                Change Password
                <FaLock
                  style={{
                    width: "0.8rem",
                    height: "0.8rem",
                    marginTop: "-0.3rem",
                    marginLeft: ".5rem",
                  }}
                />
              </button>
            </Card.Body>
          </Card>

          {/* my order card  */}

          <Card id="my-order" border="light">
            <Card.Header>My Order</Card.Header>
            <Card.Body>
              <div style={{ display: "flex" }} className="orders">
                <div
                  style={{ height: "10rem", width: "10rem" }}
                  className="order-img"
                >
                  <img
                    style={{
                      height: "10rem",
                      width: "10rem",
                      borderRadius: "10px",
                    }}
                    src={sampleImg}
                    alt="img"
                  />
                </div>
                <div style={{ marginLeft: "5rem" }} className="order-details">
                  <Card.Text>Dish : Porotta</Card.Text>
                  <Card.Text>Price : 10rs</Card.Text>
                  <Card.Text>Quantity : 2</Card.Text>
                  <Card.Text>Total Price : 20</Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Profile;
