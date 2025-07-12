import { Eye, Heart, ShoppingCart } from 'lucide-react'
import React, { useContext } from 'react'
import { CartContext } from '../../context/Cart.context'
import { Link } from 'react-router-dom'

export default function Card({productInfo}) {


    const { id , title , description , imageCover , price , category , ratingsAverage} = productInfo    
    const {addToCart} = useContext(CartContext)
    return (
        <div className='card bg-white shadow-xl group'>

            <div className='relative'>
                <img src={imageCover} alt="" />
          
                <div className='opacity-0 absolute bg-gray-500/40 inset-0 flex justify-center items-center gap-3 group-hover:opacity-100 transition-all'>
                    <Heart className='bg-mainColor text-white p-1 w-8 h-8 rounded-full hover:text-mainColor hover:bg-white transition-all cursor-pointer'  />
                    <ShoppingCart onClick={ ()=>{ addToCart(id) } } className='bg-mainColor text-white p-1 w-8 h-8 rounded-full hover:text-mainColor hover:bg-white transition-all cursor-pointer'  />
                   <Link to={`/product/${id}`}> <Eye   className='bg-mainColor text-white p-1 w-8 h-8 rounded-full hover:text-mainColor hover:bg-white transition-all cursor-pointer'  /></Link>
                </div>
            </div>

            <div className='card-body space-y-4 p-4'>
                <div>
                    <h2 className='line-clamp-1 text-xl font-semibold'>{title}</h2>
                    <h3 className=' text-lg font-semibold text-mainColor'>{category.name}</h3>
                </div>
                <p className='line-clamp-2 text-sm text-slate-500'>{description}</p>

                <div className='flex justify-between items-center'>
                    <h3>{price}EGP</h3>
                    <h3> <i className='fa-solid fa-star text-yellow-500'></i>{ratingsAverage}</h3>
                </div>
            </div>
        </div>
    )
}
