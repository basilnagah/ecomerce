import Card from '../../components/Card/Card'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import CategorySlider from '../../components/CategorySlider/CategorySlider'
import { useQuery } from '@tanstack/react-query'

export default function Home() {




    async function getAllProducts() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/products',
            method: 'get'
        }

        return await axios.request(options)
    }







    const { data, isError, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts ,
        staleTime:60*60*1000,
        refetchOnMount:true
    })



    



    if (isLoading) {
        return <Loading />
    }

    if(isError){
        return <h2>errorrrr</h2>
    }


    return (
        <div className='py-10 space-y-8'>


            {/* home slider */}
            <HomeSlider />


            {/* category slider */}
            <CategorySlider />


            {/* products */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 my-5">
                    {data.data.data.map((product) => <Card productInfo={product} key={product.id} />)}
                </div>



        </div>
    )
}




