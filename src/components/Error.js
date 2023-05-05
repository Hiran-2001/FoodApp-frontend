import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import errImg from  "../assets/404.png"
function Error() {
  const navigate = useNavigate()
  const goHome=()=>{
    navigate('/login')
  }
  return (
    <div style={{textAlign:"center", backgroundColor:'black' , height:"100vh"}}>
      <div  className="error" style={{width:"100vw"}}>
        <img id='errImg' style={{width:"100%",objectFit:"contain"}} src={errImg} alt=""  />
      </div>
      <div  className="goback" style={{ color:"white",marginTop:"50px"}}>
        <h2>Please login to view profile</h2>
        <Button id='backButton' style={{marginTop:15 }} onClick={goHome}>Go Login</Button>
      </div>
    </div>
  )
}

export default Error