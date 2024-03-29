import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

const HomePage = () => {

  const navigate = useNavigate()

  const [cart, setCart] = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
      //toast.error('Something went wrong')

    }
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  //GET ALL PRODUCTS FUNCTION
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])


  //get total count

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
      setTotal(data?.total)
    } catch (error) {
      console.log(error)

    }
  }

  useEffect(() => {
    getTotal()
  }, [])

  //load more
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])

  //handle filter function
  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }
  useEffect(() => {
    if (!checked?.length || !radio.length) getAllProducts()

  }, [checked?.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) filterProduct()
  }, [checked, radio])
  //get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked, radio })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)

    }
  }



  return (
    <Layout title={"CyberShopper - All products"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className='text-center'>Filter by Category</h4>
          <div className="d-flex flex-column">
            {categories?.map(c => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/*Price filter*/}

          <h4 className='text-center mt-4'>Filter by Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name} </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className='btn btn-danger' onClick={() => window.location.reload()}>RESET FILTERS</button>
          </div>
        </div>
        <div className="col-md-9">

          <h1 className='text-center'>All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map(p => (

              <div className="card m-2" style={{ width: '18rem' }} >
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text">₹ {p.price}</p>
                  <button className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}>See details</button>
                  <button className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p])
                      localStorage.setItem('cart', JSON.stringify([...cart, p]))
                      toast.success('Product added to cart.')
                    }} >
                    Add to Cart
                  </button>

                </div>
              </div>


            ))}
          </div>
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button className='btn btn-warning' onClick={(e) => {
                e.preventDefault()
                setPage(page + 1)
              }}>
                {loading ? "loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage