import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../styles/AuthStyles.css'


const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")


    const navigate = useNavigate()


    //form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
                {
                    email, newPassword, answer
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
        <Layout title={"Ecomm - Reset Password"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">RESET PASSWORD</h4>

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
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder='Enter your favorite fruit'
                            className="form-control"
                            id="exampleInputEmail1"
                            required
                        />

                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder='Enter New Password'
                            className="form-control"
                            id="exampleInputPassword1"
                            required
                        />
                    </div>
                    <div className="mb-3">



                    </div>
                    <div className="mb-3">


                    </div>



                    <button type="submit" className="btn btn-primary">RESET</button>
                </form>

            </div>
        </Layout>
    )
}

export default ForgotPassword