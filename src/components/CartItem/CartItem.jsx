import { Trash } from 'lucide-react'
import React, { useContext } from 'react'
import { CartContext } from '../../context/Cart.context'

export default function CartItem({ cartInfo }) {
    const { removeFromCart, updateCart } = useContext(CartContext)



    const { count, price, product } = cartInfo
    const { imageCover, title, id, category } = product
    return (
        <div className='flex justify-between items-center my-4 px-5'>
            <div className='flex gap-5'>
                <img className='w-26' src={imageCover} alt="" />

                <div className='space-y-5'>
                    <div>
                        <h3 className='text-lg font-semibold'>{title}</h3>
                        <h3 className='text-md '>{category.name}</h3>
                        <h4 className='text-mainColor font-light'>Price : {price} EGP</h4>
                    </div>
                    <button onClick={() => { removeFromCart(id) }} className='bg-red-600 text-white rounded-md px-4 py-2 flex items-center gap-1'> <Trash /> REMOVE </button>
                </div>
            </div>

            <div className='space-x-3'>
                <button onClick={() => { updateCart({count: count + 1 ,  productID: id  }) }} className='bg-mainColor text-white p-2 rounded-md'> <i className='fa-solid fa-plus'></i> </button>
                <span>{count}</span>
                <button onClick={ ()=>{  updateCart({ productID:id , count:count-1  }) }   } className='bg-mainColor text-white p-2 rounded-md'> <i className='fa-solid fa-minus'></i> </button>
            </div>
        </div>
    )
}
