import axios from 'axios'
import Loading from '../Loading/Loading'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useQuery } from '@tanstack/react-query';


export default function CategorySlider() {

    async function getAllCategories() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/categories',
            method: 'get'
        }

        return await axios.request(options)

    }


    const { data, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: getAllCategories,
        staleTime: 1000000,
        refetchOnMount: true
    })

    if (isLoading) {
        return <Loading />
    }

    return (
        <>

            <h2 className='text-xl font-semibold'>shop all categories</h2>

            <Swiper slidesPerView={6} loop={true}>

                {data.data.data.map((category) => <SwiperSlide key={category._id}>
                    <img src={category.image} alt="" className='h-64 object-cover' />
                    <h2>{category.name}</h2>
                </SwiperSlide>)}

            </Swiper> 
        </>
    )
}
