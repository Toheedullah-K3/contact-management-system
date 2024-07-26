import React from 'react'

const Container = ({children}) => {
  return (
    <div className='w-full max-w-screen-xl mx-auto px-4 bg-black'>
      {children}
    </div>
  )
}

export default Container
