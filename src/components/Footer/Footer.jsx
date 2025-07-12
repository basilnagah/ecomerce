import React from 'react'
import amazonLogo from '../../assets/images/amazon-pay.png'
import americaLogo from '../../assets/images/American-Express-Color.png'
import paybalLogo from '../../assets/images/paypal.png'
import masterLogo from '../../assets/images/mastercard.webp'
import applelogo from '../../assets/images/get-apple-store.png'
import googlelogo from '../../assets/images/get-google-play.png'

export default function Footer() {
  return (
    <footer className=' w-full bg-slate-200 py-8'>
      <div className="container space-y-4">
        <div>
          <h3 className='text-2xl'>Get the fresh cart app</h3>
          <p className='text-slate-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, temporibus?</p>
        </div>

        <div className='flex items-center gap-3'>
          <input className='input' type="text" placeholder='email...' />
          <button className='btn'>share link</button>
        </div>


        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <h3>Payment prtenrs</h3>
            <img src={amazonLogo} className='w-[80px]' alt="" />
            <img src={americaLogo} className='w-[80px]' alt="" />
            <img src={paybalLogo} className='w-[80px]' alt="" />
            <img src={masterLogo} className='w-[80px]' alt="" />
          </div>
          <div className='flex items-center gap-4'>
            <h3> get delevires with freshcart</h3>
            <img src={applelogo} className='w-[80px]' alt="" />

            <img src={googlelogo} className='w-[80px]' alt="" />

          </div>
        </div>

      </div>
    </footer>
  )
}
