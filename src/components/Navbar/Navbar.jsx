import React, { useContext, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoImage from '../../assets/images/freshcart-logo.svg'
import { LogOut, ShoppingCart } from 'lucide-react'
import { TokenContext } from '../../context/Token.context'
import { CartContext } from '../../context/Cart.context'

export default function Navbar() {

  const { token, logOut } = useContext(TokenContext)
  const { cartInfo, getAllCart } = useContext(CartContext)


  useEffect(() => {
    getAllCart()
  }, [])


  return (
    <>
      <nav className='bg-slate-200 py-5 fixed top-0 w-full z-10'>
        <div className="container flex justify-between items-center">

          <Link to={'home'}> <img src={logoImage} alt="" /> </Link>

          {token ? <ul className='flex gap-3'>
            <li><NavLink className='hover:font-semibold transition-all duration-500 cursor-pointer' to={'/home'}>Home</NavLink></li>
            <li><NavLink className='hover:font-semibold transition-all duration-500 cursor-pointer' to={'/Products'}>Products</NavLink></li>
            <li><NavLink className='hover:font-semibold transition-all duration-500 cursor-pointer' to={'/Categories'}>Categories</NavLink></li>
            <li><NavLink className='hover:font-semibold transition-all duration-500 cursor-pointer' to={'/Brands'}>Brands</NavLink></li>
            <li><NavLink className='hover:font-semibold transition-all duration-500 cursor-pointer' to={'/allorders'}>Orders</NavLink></li>
          </ul> : null}



          <ul className='flex justify-between items-center gap-3'>
            {token ? <li> <Link className='relative' to={'/cart'}>

              <ShoppingCart />
              <h5 className='absolute top-[-10px] right-[-10px] rounded-full w-5 h-5 p-2 text-white bg-mainColor flex items-center justify-center'>
                {cartInfo == null ? <i className='fa-solid fa-spinner fa-spin'></i> : cartInfo.numOfCartItems}
              </h5>
            </Link></li> : null}

            <li> <i className='fa-brands fa-facebook'></i> </li>
            <li> <i className='fa-brands fa-instagram'></i> </li>
            <li> <i className='fa-brands fa-twitter'></i> </li>
            <li> <i className="fa-brands fa-linkedin"></i> </li>
            {token ? <li onClick={logOut} className='hover:font-semibold transition-all duration-500 cursor-pointer'> <LogOut /> </li>
              : <>         <li className='hover:font-semibold transition-all duration-500 cursor-pointer'> <NavLink to={'login'}>Login</NavLink>  </li>
                <li className='hover:font-semibold transition-all duration-500 cursor-pointer'> <NavLink to={'register'}>Register</NavLink> </li></>}
          </ul>
        </div>
      </nav>
    </>
  )
}
