import slugify from "slugify"
import productModel from "../models/productModel.js"
import fs from 'fs'


//create product controller
export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required!" })
            case !description:
                return res.status(500).send({ error: "description is required!" })
            case !price:
                return res.status(500).send({ error: "price is required!" })
            case !category:
                return res.status(500).send({ error: "category is required!" })
            case !quantity:
                return res.status(500).send({ error: "quantity is required!" })
            case !photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is required and should not be more than 1mb" })
        }



        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            products
        })
    } catch (error) {
        console.log(error)
        resizeBy.status(500).send({
            success: false,
            error,
            message: 'error in creating product'
        })
    }
}

//get all products controller

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            totalproducts: products.length,
            message: "all products fetched successfully",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while fetching products",
            error: error.message
        })
    }
}

//get single product controller

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select('-photo').populate('category')
        res.status(200).send({
            success: true,
            message: "product fetched successfully",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while fetching the product",
            error
        })
    }
}

//get photo controller

export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set("content-type", product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while loading photo",
            error
        })
    }
}

//delete controller

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: "product deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while deleting product',
            error
        })

    }
}

//update controller
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required!" })
            case !description:
                return res.status(500).send({ error: "description is required!" })
            case !price:
                return res.status(500).send({ error: "price is required!" })
            case !category:
                return res.status(500).send({ error: "category is required!" })
            case !quantity:
                return res.status(500).send({ error: "quantity is required!" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is required and should not be more than 1mb" })
        }



        const products = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) }, { new: true }
        )
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'error in updating product'
        })
    }
}

//filter controller

export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            message: "Products filtered successfully",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "error while filtering products",
            error,
        })
    }
}

//product count

export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            messaage: "error in product count",
            error,
        })
    }
}

//product list based on page

export const productListController = async (req, res) => {
    try {
        const perPage = 8
        const page = req.params.page ? req.params.page : 1
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            messaage: 'error in per page controller',
            error,
        })
    }
}