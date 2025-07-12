import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from './../../context/Cart.context';
import { TokenContext } from '../../context/Token.context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Checkout() {
    const [payment, setPayment] = useState(null)

    const { cartInfo } = useContext(CartContext)
    const { token } = useContext(TokenContext)
    const navigate = useNavigate()

    async function makeOnlineOrder(values) {
        const loading = toast.loading('loading..')


        try {
            const test = {
                shippingAddress: values
            }
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=http://localhost:5173`,
                method: 'post',
                data: test,
                headers: {
                    token
                }
            }


            const { data } = await axios.request(options)
            console.log(data);
            toast.success('order made successfully')

            setTimeout(() => {
                location.replace(data.session.url)

            }, 1000);

        } catch (error) {
            console.log(error);

        } finally {
            toast.dismiss(loading)
        }

    }

    async function makeCashOrder(values) {

        const loading = toast.loading('loading..')


        try {
            const test = {
                shippingAddress: values
            }

            // id
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                method: 'POST',
                data: test,
                headers: {
                    token,
                }
            }

            const { data } = await axios.request(options)
            console.log(data);
            toast.success('order made successfully')
            navigate('/allorders')
        } catch (error) {
            console.log(error);

        } finally {
            toast.dismiss(loading)
        }

    }


    const formik = useFormik({
        initialValues: {
            city: '',
            phone: '',
            details: ''
        },
        onSubmit: (values) => {
            if (payment == 'cash') {
                makeCashOrder(values)
            } else {
                makeOnlineOrder(values)
            }
        }
    })


    return (
        <div>
            <h2 className='text-xl font-semibold mt-8'>fill your details</h2>



            <form onSubmit={formik.handleSubmit}>

                <div className='my-1'>
                    <label htmlFor="">city</label>
                    <input
                        type="text"
                        className='input bg-gray-200 w-full my-3'
                        name='city'
                        value={formik.values.city}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className='my-1'>
                    <label htmlFor="">phone</label>
                    <input
                        type="text"
                        className='input bg-gray-200 w-full my-3'
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        name='phone'
                    />
                </div>
                <div className='my-1'>
                    <label htmlFor="">details</label>
                    <input
                        type="text"
                        className='input bg-gray-200 w-full my-3'
                        value={formik.values.details}
                        onChange={formik.handleChange}
                        name='details'
                    />
                </div>

                <button onClick={() => { setPayment('cash') }} type='submit' className='btn bg-blue-700 my-4'>Create Cash order</button>
                <button onClick={() => { setPayment('online') }} type='submit' className='btn  my-4 mx-4'>Create online order</button>
            </form>

        </div>
    )
}
