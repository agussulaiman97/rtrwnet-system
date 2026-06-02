import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        form
      )

      localStorage.setItem(
        'token',
        response.data.token
      )

      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      )

      navigate('/')

    } catch (error) {

      alert('Login gagal')

    }

  }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-3xl shadow w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center">
          RT/RW Net Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Username"
            className="w-full border rounded-xl px-4 py-3"
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-3"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">

            Login

          </button>

        </form>

      </div>

    </div>
  )
}