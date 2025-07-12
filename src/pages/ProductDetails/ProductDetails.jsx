import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from './../../components/Loading/Loading';
import { CartContext } from './../../context/Cart.context';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from './../../components/Card/Card';
import ReactImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import useOnline from '../../hooks/useOnline';



export default function ProductDetails() {

    const { id } = useParams()
    const { addToCart } = useContext(CartContext)
    const [productDetails, setProductDetails] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState(null)
    const {online} = useOnline()


    async function getProductDetails() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
            method: 'GET',
        }

        const { data } = await axios.request(options)
        setProductDetails(data.data)
        console.log(data.data);

    }

    async function getRelatedProducts() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
            method: 'GET'
        }

        const { data } = await axios.request(options)

        setRelatedProducts(data.data)
    }

    // mounting phase  id
    useEffect(() => {
        getProductDetails()

    }, [id])

    // mounting  , updating
    useEffect(() => {
        if (productDetails) {
            getRelatedProducts()
        }
    }, [productDetails])


    return (
        <>
            {productDetails == null ? <Loading /> :
                <>
                    <div className='grid grid-cols-12 gap-6 py-10'>




                        <div className='col-span-4'>

                            <ReactImageGallery showFullscreenButton={false} showPlayButton={false} items={productDetails.images.map((image) => { return { original: image, thumbnail: image } })} />

                        </div>







                        <div className='col-span-8 py-5 space-y-5'>
                            <div>
                                <h2 className='text-xl'>{productDetails.title}</h2>
                                <h3 className='text-xl font-semibold text-mainColor'>{productDetails.category.name}</h3>
                            </div>
                            <p>{productDetails.description}</p>

                            <div className='flex items-center justify-between'>
                                <h4>{productDetails.price}EGP</h4>
                                <h4>{productDetails.ratingsAverage} <i className='fa-solid fa-star text-yellow-500'></i></h4>
                            </div>


                            {online ?
                                <button onClick={() => { addToCart(productDetails.id) }} className='btn w-full'>Add to cart</button>
                                : <h2>you are offline log in to add to cart</h2>}


                        </div>
                    </div>


                    <div>
                        <h2 className='text-2xl font-semibold'>Related Products</h2>

                        <Swiper slidesPerView={6} spaceBetween={'10px'} loop={false}>

                            {relatedProducts?.map((product) => <SwiperSlide key={product.id} >

                                <Card productInfo={product} />
                            </SwiperSlide>)}
                        </Swiper>
                    </div>

                </>
            }





        </>


    )
}
