import React from 'react'
import { useSelector } from 'react-redux'

const Name = () => {
    const authStatus = useSelector(state => state.auth.status)
    const userData = useSelector(state => state.auth.userData)
  return (
    <div>
        {authStatus && (
          <>
          <h1 className='text-center text-7xl font-bold'> Hi </h1>
          <h1 className='text-center text-7xl font-bold'> {userData} </h1>
          </>
        )}
    </div>
  )
}

export default Name
