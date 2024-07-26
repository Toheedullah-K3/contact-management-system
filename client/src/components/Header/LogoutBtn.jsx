import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import axios from 'axios'

function LogoutBtn() {

  const dispatch = useDispatch()

  const apiUrl = import.meta.env.VITE_API_URL;
  const logoutHandler = async() => {
    await axios.post(`${apiUrl}/user/logout`, {} , {
      withCredentials: true
    })

    console.log("User Logout Successfully.")
    dispatch(logout())
}
  return (
    <button 
        className= 'logout-btn' 
        onClick={logoutHandler}
    >
        Logout
    </button>
  )
}

export default LogoutBtn
