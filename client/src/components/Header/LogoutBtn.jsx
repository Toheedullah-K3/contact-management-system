import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import axios from 'axios'
import { FaSignOutAlt } from 'react-icons/fa'

function LogoutBtn() {

  const dispatch = useDispatch()

  const apiUrl = import.meta.env.VITE_API_URL;
  const logoutHandler = async() => {
    try {
      await axios.post(`http://localhost:4000/user/logout`, {} , {
        withCredentials: true
      })
  
      console.log("User Logout Successfully.") 
      dispatch(logout())
    } catch (error) {
      console.log("Logout Error", error)
    }
}
  return (
    <button
      className="relative flex items-center justify-center text-gray-900 bg-gray-100 rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-200 hover:w-[60px] w-[50px] h-[50px] flex-shrink-0 focus:outline-none"
      onClick={logoutHandler}
    >
      <span className="absolute inset-0 bg-gray-200 opacity-30 group-hover:opacity-40 transition-opacity duration-300"></span>
      <div className="relative z-10 flex items-center justify-center">
        <FaSignOutAlt className="w-6 h-6 text-gray-900" />
      </div>
      
    </button>
  )
}

export default LogoutBtn
