import React from 'react'
import './navbar.scss'

const Navbar = () => {
  return (
    <>
      <nav className='navbar'>
        <div className="logo">
            <h1>moodify</h1>
        </div>
        <div className="logout">
            <button>Logout</button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
