import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const PagenotFound = () => {
    return (
        <Layout title={"Oops! - Page-not-Found"}>
            <div className="pnf">
                <h1 className="pnf-title">404</h1>
                <h2 className="pnf-heading">Page not Found</h2>
                <Link to='/' className='pnf-btn'>
                    Go to HomePage
                </Link>
            </div>

        </Layout>
    )
}

export default PagenotFound