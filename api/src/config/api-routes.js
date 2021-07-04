import CategoryController from '../controllers/CategoryController'
import ArticleController from '../controllers/ArticleController'
import UserController from '../controllers/UserController'
import SupplierController from '../controllers/SupplierController'
import asyncHandler from '../middlewares/async'
import { protect, authorize } from '../middlewares/auth'
import express from 'express'
import path from 'path'

export default (server) => {

    // APP
    server
        .use('/public', express.static(path.join(__dirname, '../../../app')))

    // USER ROUTES
    server
        .post('/api/login', asyncHandler(UserController.login))
        .post('/api/register', asyncHandler(UserController.register))
        .get('/api/me', protect, UserController.getMe)
        .post('/api/logout', UserController.logout)

    // CATEGORY ROUTES
    server
        .get('/api/category', protect, asyncHandler(CategoryController.get))
        .post('/api/category', protect, asyncHandler(CategoryController.insert))
        .put('/api/category/:id', protect, asyncHandler(CategoryController.update))
        .delete('/api/category/:id', protect, authorize('admin'), asyncHandler(CategoryController.delete))

    // ARTICLE ROUTES
    server
        .get('/api/article', protect, asyncHandler(ArticleController.get))
        .post('/api/article', protect, asyncHandler(ArticleController.insert))
        .put('/api/article/:id', protect, asyncHandler(ArticleController.update))
        .delete('/api/article/:id', protect, authorize('admin'), asyncHandler(ArticleController.delete))

    // SUPPLIER ROUTES
    server
        .get('/api/supplier', protect, asyncHandler(SupplierController.get))
        .post('/api/supplier', protect, asyncHandler(SupplierController.insert))
        .put('/api/supplier/:id', protect, asyncHandler(SupplierController.update))
        .delete('/api/supplier/:id', protect, authorize('admin'), asyncHandler(SupplierController.delete))

}