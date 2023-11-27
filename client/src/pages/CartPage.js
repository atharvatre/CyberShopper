import Layout from '../components/Layout/Layout'
import React from 'react'
import { useCart } from '../context/cart'
import { useAuth } from '../context/Auth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart()
    const navigate = useNavigate()

    //Cart total
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => {
                total = total + item.price
            })
            return total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR"
            })
        } catch (error) {
            console.log(error)
        }
    }

    //remove item from cart
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
            toast.success("Item removed from cart")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className='conatiner'>
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "Please login to checkout"}` : "Your cart is empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">

                        {
                            cart?.map(p => (
                                <div className="row mb-2 p-3 card flex-row">
                                    <div className="col-md-4">
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} height={"250px"} width={"100px"} />

                                    </div>
                                    <div className="col-md-8">
                                        <h4>{p.name}</h4>
                                        {/* <p>{p.description.substring(0, 5)}</p> */}
                                        <h4>Price: {p.price}</h4>
                                        <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    <div className="col-md-3 text-center">
                        <h4>
                            Cart Summary
                        </h4>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()} </h4>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage