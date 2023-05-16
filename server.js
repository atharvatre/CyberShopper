import express from "express"
import colors from "colors"
import dotenv from 'dotenv'
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
//configure env
dotenv.config();


//database config

connectDB()

//creating rest objects

const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes)

//creating rest api

app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1>'

    )
})

//PORT

const PORT = process.env.PORT || 8080

//run 

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`.bgCyan.white)
})