import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/Auth'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
    //context
    const [auth, setAuth] = useAuth()


    //state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    //get user data
    useEffect(() => {
        const { email, name, address, phone } = auth?.user
        setName(name)
        setEmail(email)
        setPhone(phone)
        setAddress(address)

    }, [auth?.user])

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,
                {
                    name, email, password, phone, address
                })
            if (data?.error) {
                toast.error(data?.error)
            } else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem("auth", JSON.stringify(ls))
                toast.success("profile updated successfully!")
            }


        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout title={"Your Profile"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                                <h4 className="title">User Profile</h4>
                                <div className="mb-3">

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Enter Your Name'
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        required
                                        autoFocus
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

                                        disabled
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

                                    />

                                </div>



                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile