import { useMemo, useState } from "react"

export default function Products() {

    const [counter1 , setCounter1] = useState(0)
    const [counter2 , setCounter2] = useState(0)

    function increaseCounter1(){
        setCounter1(counter1+1)
    }


    function increaseCounter2(){
        setCounter2(counter2+1)
    }


    const handleCOunter1 = useMemo(()=>{

        console.log('ayhagaa');
        return counter1%2==0

    } , [counter1])


    return (
        <div className='py-62'>
            <div className="grid grid-cols-12">

            <div className="col-span-6">
                <h2 className="text-3xl">counter: {counter1}</h2>
                <h4>{handleCOunter1 ? 'even' : 'odd'}</h4>
                <button onClick={increaseCounter1} className="bg-blue-500 px-4 py-2 text-white">inc</button>
            </div>

            <div className="col-span-6">
                <h2 className="text-3xl">counter: {counter2}</h2>
                <button onClick={increaseCounter2} className="bg-blue-500 px-4 py-2 text-white">inc</button>
            </div>

            </div>

        </div>
    )
}
