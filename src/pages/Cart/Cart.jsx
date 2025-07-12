import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../context/Cart.context'
import Loading from '../../components/Loading/Loading'
import { ShoppingCart } from 'lucide-react'
import CartItem from '../../components/CartItem/CartItem'
import { Link } from 'react-router-dom'

export default function Cart() {
    const { getAllCart, cartInfo, clearCart } = useContext(CartContext)


    useEffect(() => {
        getAllCart()
    }, [])


    if (cartInfo?.numOfCartItems == 0) {
        return <section className='bg-gray-200 p-5 my-10'>
            <h2 className='text-2xl font-semibold flex items-center gap-2'>Shop Cart <ShoppingCart /></h2>
            <h3 className='text-xxl text-mainColor'>Total :0 EGP</h3>

            <div className='my-6 flex justify-center items-center flex-col'>
                <h2>your cart is empty</h2>
                <button className='text-white bg-mainColor rounded-md px-4 py-2'> <Link to={'/home'}>return to products page</Link> </button>
            </div>

        </section>
    }

    return (
        <>
            {cartInfo ?
                <>
                    <section className='bg-gray-200 p-5 my-10'>
                        <h2 className='text-2xl font-semibold flex items-center gap-2'>Shop Cart <ShoppingCart /></h2>
                        <h3 className='text-xxl text-mainColor'>Total : {cartInfo.data.totalCartPrice}EGP</h3>

                        <div className='my-6'>
                            {cartInfo.data.products.map((cart) => <CartItem cartInfo={cart} key={cart._id} />)}
                        </div>
                        <div className='w-fit ms-auto'>
                            <button onClick={clearCart} className='bg-red-600 text-white px-4 py-2 rounded-md '>CLEAR CART</button>
                        </div>
                    </section>

                    <div className='w-fit ms-auto mb-5'>
                        <Link to={'/Checkout'}>
                            <button className='btn py-2 text-lg'>go to checkout</button>
                        </Link>
                    </div>
                </>
                : <Loading />}
        </>
    )
}
