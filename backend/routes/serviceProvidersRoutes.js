import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import ServiceProvider from '../models/serviceProvider.model.js';
import { createServiceProvider, getServiceProviders, removeServiceProvider } from '../controllers/serviceProvider.controller.js';

//Routes
router.get('/', getServiceProviders);
router.post('/', createServiceProvider);
router.delete('/:id', removeServiceProvider);

export default router;