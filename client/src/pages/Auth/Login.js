import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import '../../styles/AuthStyles.css'
import { useAuth } from '../../context/Auth';



const Login = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [auth, setAuth] = useAuth()

  const navigate = useNavigate()
  const location = useLocation()


  //form function
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email, password
        })
      if (res && res.data.success) {
        toast.success(res.data && res.data.message,)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem('auth', JSON.stringify(res.data))
        setTimeout(() => {
          navigate(location.state || "/")
        }, 2000)
        //navigate("/login")
      }
      else {
        toast.error(res.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <Layout title={"Ecomm - Login"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
          
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your Email id'
              className="form-control"
              id="exampleInputEmail1"
              required
            />

          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Password'
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          
          <div className="mb-3">
            <button type="button" className="btn btn-primary" onClick={() => {
              navigate('/forgot-password')
            }}>Forgot Password?</button>
          </div>
          <button type="submit" className="btn btn-primary">LOGIN</button>
        </form>

      </div>
    </Layout>
  )
}

export default Login