
import Header from "./components/navbar/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import CardsDetails from "./components/cart/CardsDetails";
import Cards from "./components/Home/Cards";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Profile from "./components/Profile/Profile";

import Error from "./components/Error";
import UpdateProfile from "./components/Profile/UpdateProfile";
import AddFoods from "./components/admin/addFoods/AddFoods";

// import axios from "axios"
// import { useEffect } from "react";
function App() {
  
  // const getData=()=>{
  //   axios.get("/food").then((res)=>{
  //     console.log(res.data);
  //   })
  // }
  // useEffect(() => {
  //  getData()
  // }, []);

  return (
    
    <div className="App">
  
      <Header />
      <Routes>
        <Route path="/" element={<Cards/>} />
        <Route path="/cart/:id" element={<CardsDetails/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signin" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile/update/:id" element={<UpdateProfile/>} />
        <Route path="/admin/create-food" element={<AddFoods/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
  
    </div>
  );
}

export default App;
