const Product = require("../models/productModel");
const { getPostData } = require("../utils");

/**
 * @description Get all the products
 * @route GET /api/products
 * @param {object} req
 * @param {object} res
 */
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}

/**
 * @description Get a single product
 * @route GET /api/product/:id
 * @param {object} req
 * @param {object} res
 * @param {int} id
 */
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Products not found" }));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(product));
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @description Create a new product
 * @route POST /api/products/
 *
 * @param {object} req
 * @param {object} res
 */
async function createProduct(req, res) {
    try {
        const body = await getPostData(req);

        const { title, description, price } = JSON.parse(body);
        const product = {
            title,
            description,
            price,
        };
        const newProduct = await Product.create(product);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
};
