import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from './../../context/Token.context';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';
import Loading from './../../components/Loading/Loading';
import { Link } from 'react-router-dom';

export default function Orders() {

    const { token } = useContext(TokenContext)
    const [orders, setOrders] = useState(null)
    const { id } = jwtDecode(token)

    async function getAllOrders() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            method: 'get'
        }

        const { data } = await axios.request(options)
        setOrders(data)
        console.log(data);

    }


    useEffect(() => {

        getAllOrders()
    }, [])


    return (


        <>
            {orders == null ? <Loading /> :


                orders.map((order) =>
                    <div key={order.id} className='border-2 border-gray-500/30 p-5 my-10'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h3>Order ID</h3>
                                <h3>#{order.id}</h3>
                            </div>
                            <div>
                                <button className='btn bg-blue-700 mx-4'>
                                    {order.isDelivered == false ? 'NOT DELEIVERD' : 'DELEIVERD'}
                                </button>
                                <button className={`btn ${order.isPaid ? 'bg-green-500' : 'bg-red-600 '} `}>
                                    {order.isPaid == false ? 'NOT PAID' : " PAID"}
                                </button>
                            </div>
                        </div>

                        <div className='grid grid-cols-6 my-4 gap-4'>

                            {order.cartItems.map((product) =>
                                <div key={product.product.id} className='border-2 border-gray-500/30'>
                                    <img className='w-full' src={product.product.imageCover} alt="" />
                                    <div className='space-y-3 p-4'>
                                        <div>
                                            <Link to={`/product/${product.product.id}`}><h2 className='text-lg font-semibold line-clamp-1'>{product.product.title}</h2></Link>
                                            <h3 className='text-mainColor font-semibold'>{product.product.category.name}</h3>
                                        </div>
                                        <div className='flex justify-between'>
                                            <h3>{product.price }EGP</h3>
                                            <h3>count: {product.count}</h3>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        <h2>Total cart price : {order.totalOrderPrice} EGP</h2>
                    </div>)
            }





        </>

    )
}
