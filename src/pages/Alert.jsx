import React from 'react'

export const Alert = ({ message }) => {
  return (
    <div className='bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 text-center my-10 relative'>
      <span className='sm:inline-block'>{message}</span>
    </div>
  )
}
