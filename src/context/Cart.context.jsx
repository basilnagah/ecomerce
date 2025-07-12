import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import { TokenContext } from './Token.context'
import toast from 'react-hot-toast'


export const CartContext = createContext(null)

export default function CartProivder({ children }) {
    const { token } = useContext(TokenContext)
    const [cartInfo, setCartInfo] = useState(null)


    // add to cart   (error)
    async function addToCart(productId) {
        const loading = toast.loading('loading.....')

        try {
            const options = {
                url: 'https://ecommerce.routemisr.com/api/v1/cart',
                method: 'POST',
                data: {
                    productId,
                },
                headers: {
                    token,
                }
            }
            const { data } = await axios.request(options)

            if (data.status == 'success') {
                toast.success(data.message)
                getAllCart()
            }

        } catch (error) {
            console.log(error);
            toast.error('error....')
        } finally {
            toast.dismiss(loading)
        }


    }

    // display cart
    async function getAllCart() {

        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/cart',
            method: 'GET',
            headers: {
                token,
            }
        }

        const { data } = await axios.request(options)
        setCartInfo(data)


    }

    // remove cart
    async function removeFromCart(productID) {
        const loading = toast.loading('loading....')
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
                method: 'DELETE',
                headers: {
                    token,
                }
            }


            const { data } = await axios.request(options)

            setCartInfo(data)
            toast.success('item removed from cart')
        } catch (error) {
            toast.error('error')

        } finally {
            toast.dismiss(loading)
        }

    }

    // clear
    async function clearCart() {

        const loadingiD = toast.loading('loading....')

        try {
            const options = {
                url: 'https://ecommerce.routemisr.com/api/v1/cart',
                method: "DELETE",
                headers: {
                    token,
                }
            }

            const { data } = await axios.request(options)

            setCartInfo({
                numOfCartItems: 0
            })
            toast.success('sucesss')
        } catch (error) {
                console.log(error);
                
        }finally{
            toast.dismiss(loadingiD)
        }
    }

    async function updateCart({ productID , count  }){

        const loadingID = toast.loading('loading...')
        
        try {
                    
        const options={
            url:`https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
            method:'PUT',
            data:{
                count,
            },
            headers:{
                token,
            }
        }  
        
        const {data} = await axios.request(options)

        setCartInfo(data)
        toast.success('count updated')
        } catch (error) {
                console.log(error);
                
        }finally{
            toast.dismiss(loadingID)
        }
        
    }

    return <CartContext.Provider value={{ addToCart, getAllCart, cartInfo, removeFromCart, clearCart , updateCart }}>
        {children}
    </CartContext.Provider>
}