import React, { useState } from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import Checkbox from '@/components/ui/Checkbox'
import Link from 'next/link'
import { ToastContainer } from 'react-toastify'
import useAuth from '@/hooks/useAuth'

const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is Required'),
    password: yup.string().required('Password is Required'),
  })
  .required()
const LoginForm = () => {
  const { handleEmailLogin } = useAuth()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: 'all',
  })

  const onSubmit = (data) => {
    handleEmailLogin({
      email: data.email,
      password: data.password,
    })
  }

  const [checked, setChecked] = useState(false)

  return (
    <>
      <ToastContainer />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <Textinput
          name="email"
          label="email"
          defaultValue=""
          type="email"
          register={register}
          error={errors?.email}
        />
        <Textinput
          name="password"
          label="passwrod"
          type="password"
          defaultValue=""
          register={register}
          error={errors.password}
        />
        <div className="flex justify-between">
          <Checkbox
            value={checked}
            onChange={() => setChecked(!checked)}
            label="Keep me signed in"
          />
          <Link
            href="/forgot-password"
            className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
          >
            Forgot Password?{' '}
          </Link>
        </div>

        <button className="btn btn-dark block w-full text-center">
          Sign in
        </button>
      </form>
    </>
  )
}

export default LoginForm
