import jwt from 'jsonwebtoken'
import asyncHandler from './async'
import ErrorResponse from '../helpers/ErrorResponse';
import User from '../models/User'

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    } else if(req.cookies.token) {
        token = req.cookies.token
    }

    if(!token) {
        throw new ErrorResponse('Not authorized to access this route', 401)
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)

    req.user = await new User().getModel().findById(decoded.id)
    return next();
})

export const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized`, 403))
        }
        next()
    }
}

export default {
    protect,
    authorize
}