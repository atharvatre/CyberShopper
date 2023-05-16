import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../styles/AuthStyles.css'
const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [answer, setAnswer] = useState("")
  const navigate = useNavigate()
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name, email, password, phone, address,answer
        })
      if (res && res.data.success) {
        toast.success(res.data && res.data.message,)
        setTimeout(() => {
          navigate("/login")
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
    <Layout title={"Ecomm - register"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter Your Name'
              className="form-control"
              id="exampleInputEmail1"
              required
            />

          </div>
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

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='Enter Phone'
              className="form-control"
              id="exampleInputEmail1"
              required
            />

          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Enter Your Address'
              className="form-control"
              id="exampleInputEmail1"
              required
            />

          </div>
            <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder='What is your favorite fruit?'
                className="form-control"
                id="exampleInputEmail1"
                required
              />

            </div>


          <button type="submit" className="btn btn-primary">REGISTER</button>
        </form>

      </div>
    </Layout>
  )
}

export default Register