import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        category: {type: String},
        image: {type: String},
        stock: {type: Number, default: 0},
    },
    {timestamps: true}
);
export const product = mongoose.model("Product", productSchema);
