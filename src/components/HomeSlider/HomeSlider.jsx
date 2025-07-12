import homeSlider1 from '../../assets/images/slider-image-1.jpeg'
import homeSlider2 from '../../assets/images/slider-image-2.jpeg'
import homeSlider3 from '../../assets/images/slider-image-3.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


export default function HomeSlider() {



    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-8'>

                <Swiper slidesPerView={1} loop={true}>
                    <SwiperSlide>
                        <img src={homeSlider3} alt="" className='h-full object-cover' />

                    </SwiperSlide>

                    <SwiperSlide>
                        <img src={homeSlider1} alt="" className='h-full object-cover' />

                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={homeSlider2} alt="" className='h-full object-cover' />

                    </SwiperSlide>

                </Swiper>
            </div>
            <div className='col-span-4'>

                <img src={homeSlider1} alt="" />
                <img src={homeSlider2} alt="" />
            </div>
        </div>
    )
}
