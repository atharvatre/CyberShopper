import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"Ecomm - AboutUs"}>
        <div className="row contactus">
        <div className="col-md-6">
          <img src='/images/aboutus.jpeg' alt='about us' style={{width:"70%"}}/>
        </div>
        <div className="col-md-4">
          
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, quas aut sint officia iure impedit vero minus, beatae cum qui consequatur ea, commodi blanditiis hic saepe? Quaerat praesentium excepturi labore, minima voluptatem, placeat aliquid laborum aperiam quis est molestiae rerum suscipit, expedita nihil? Modi, minus molestiae est nulla error vero.
          </p>
          

        </div>
      </div>
    </Layout>
  )
}

export default About