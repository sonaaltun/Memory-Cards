import React from 'react'
import "../assets/style/navi.scss"
import Logo from '../assets/img//gamepadlogo.png'
const Navi = () => {
  
  return (
    <nav>
      <div className='brand'>
      <img src={Logo} alt="mylogo" />
      <h3 className='title' >GummyGame</h3>
      </div>
      <ul className='navitem'>
      </ul>

    </nav>
  )
}

export default Navi