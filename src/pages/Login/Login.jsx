import axios from 'axios';
import { useFormik } from 'formik'
import { Eye } from 'lucide-react';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { TokenContext } from '../../context/Token.context';

export default function Login() {
  const passRegex = /^[A-Z][A-Za-z0-9]{5,}$/
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [passType, setPassType] = useState(true)
  const { setToken } = useContext(TokenContext)


  const validationSchema = object({
    email: string().required('email is required').email('email must be valid'),
    password: string().required('pass is requied').matches(passRegex, 'pass must startw wth capital letter followed 5 chars or more'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: sendDataToLogin,
    validationSchema,
  })


  async function sendDataToLogin(values) {
    const loading = toast.loading('loading')
    try {
      setError(null)
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/auth/signin',
        method: 'post',
        data: values
      }

      const { data } = await axios.request(options)

      if (data.message == 'success') {

        toast.success('tmam')
        localStorage.setItem('token', data.token)
        setToken(data.token)
        setTimeout(() => {
          navigate('/home')
        }, 2000);

      }

    } catch (error) {
      console.log(error);

      toast.error('msh tmam')
      setError(error.response.data.message)
    } finally {
      toast.dismiss(loading)
    }

  }


  return (
    <div className='py-40'>
      <h1 className='text-3xl'>login form</h1>
      {error && <p className='text-3xl text-red-500 my-3'>{error}</p>}

      <form onSubmit={formik.handleSubmit}>

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
          <div className='relative'>

            <input type={passType ? 'password' : 'text'}
              className='input bg-slate-100 w-full'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

            />

            <Eye className='absolute right-4 top-[20%] cursor-pointer' onClick={() => { setPassType(!passType) }} />
          </div>
          {formik.errors.password && formik.touched.password && <p className='text-red-500 font-semibold my-4'>{formik.errors.password}</p>}

        </div>


        <button type='submit' className='btn my-4'>
          login
        </button>
      </form>
    </div>
  )
}
