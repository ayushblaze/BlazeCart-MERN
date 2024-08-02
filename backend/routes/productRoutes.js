import express from 'express';
import { getProductById, getProducts } from '../controller/productsController.js';
// import asyncHandler from 'express-async-handler';
// import Product from '../models/productModel.js';

const router = express.Router();


router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;