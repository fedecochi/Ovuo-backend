import { setRandomFallback } from "bcryptjs";
import  { product } from "../model/product.js";

// Create product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image, stock } = req.body;
        const newProduct = await product.create({
            name, description,
            price,
            category,
            image,
            stock,
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get product by id
export const getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const productf = await product.findById(productId);
        if (!productf) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({productf});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//update product

export const updateProduct = async (req, res) => {
    let productId = req.params.id
    const { name, description, price, category, image, stock } = req.body;
    
    try {
        let products = await product.findById(productId)
        if (!products) return res.status(404).json({ message: "Product not found" })
      //update only provided fields
    products.name = name || products.name
    products.description = description || products.description
    products.price = price || products.price
    products.category = category || products.category
    products.image = image || products.image
    products.stock = stock || products.stock
    await products.save()   
    res.status(200).json({ message: "Product updated successfully", 
        product:{
        id:product._id,
        name:product.name,
        description:product.description,
        price:product.price,
        category:product.category,
        image:product.image,
        stock:product.stock
    }
})
    } catch (error) {
        res.status(500).json({ message: error.message })
    } 
};

// delete product
export const deleteProduct = async (req, res) => {
    try {   
        const productid = await product.findByIdAndDelete(req.params.id);
        if (!productid) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};