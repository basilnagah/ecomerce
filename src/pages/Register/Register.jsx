import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { number, object, ref, string } from 'yup'


// uncontrolled element
// controlled element   3 steps    vairbale  value input
// formik   hooks  custom hook  useformik

// intial values    ana bb3tha
// values
// errors
// touched
// onsubmit         ana bbt3tha
// handlesubmit
// handlechange
// handl blur
// dirty

// (+2)  


export default function Register() {
  const passRegex = /^[A-Z][A-Za-z0-9]{5,}$/
  const phoneRegex = /^(\+2){0,1}01[0125][0-9]{8}$/
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // chaining
  const validationSchema = object({
    name: string().required('name is required').min(3, 'name must be min 3 chars').max(20, 'name must be max 20 chars'),
    email: string().required('email is required').email('email must be valid'),
    password: string().required('pass is requied').matches(passRegex, 'pass must startw wth capital letter followed 5 chars or more'),
    rePassword: string().required().matches(passRegex).oneOf([ref('password')], 'pass dont match'),
    phone: string().required('phone is required').matches(phoneRegex, 'phone must be egyptian number')
  })



  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    onSubmit: sendDataToRegister,
    validationSchema,
  })


  async function sendDataToRegister(values) {

    const loadingToast = toast.loading('loading....')
    setLoading(true)

    try {

      setError(null)
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/auth/signup',
        method: 'post',
        data: values
      }

      const { data } = await axios.request(options)
      toast.success('registerd successfully')

      setTimeout(() => {
        navigate('/login')
      }, 2000);
      console.log(data);

    } catch (error) {

      setError(error.response.data.message)
      toast.error(error.response.data.message)

    } finally {
      toast.dismiss(loadingToast)
      setLoading(false)
    }

  }


  console.log(formik);


  return (
    <div className='py-8 space-y-5'>
      <h1 className='text-2xl'>register Form</h1>

      {error && <p className='text-3xl text-red-500 my-3'>{error}</p>}
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="">useername</label>
          <input type="text"
            className='input bg-slate-100 w-full'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.name && formik.touched.name && <p className='text-red-500 font-semibold my-4'>{formik.errors.name}</p>}
        </div>
        <div>
          <label htmlFor="">email</label>
          <input type="text"
            className='input bg-slate-100 w-full'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />
          {formik.errors.email && formik.touched.email && <p className='text-red-500 font-semibold my-4'>{formik.errors.email}</p>}

        </div>
        <div>
          <label htmlFor="">password</label>
          <input type="text"
            className='input bg-slate-100 w-full'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />
          {formik.errors.password && formik.touched.password && <p className='text-red-500 font-semibold my-4'>{formik.errors.password}</p>}

        </div>
        <div>
          <label htmlFor="">confirm password</label>
          <input type="text"
            className='input bg-slate-100 w-full'
            name='rePassword'
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />
          {formik.errors.rePassword && formik.touched.rePassword && <p className='text-red-500 font-semibold my-4'>{formik.errors.rePassword}</p>}

        </div>
        <div>
          <label htmlFor="">phone</label>
          <input type="text"
            className='input bg-slate-100 w-full'
            name='phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />
          {formik.errors.phone && formik.touched.phone && <p className='text-red-500 font-semibold my-4'>{formik.errors.phone}</p>}

        </div>

        <button disabled={loading} type='submit' className='btn my-4'>
          {loading ?  <i class="fa-solid fa-spinner fa-spin"></i>  : 'register'}
        </button>
      </form>
    </div>
  )
}
