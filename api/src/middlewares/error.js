import ErrorResponse from '../helpers/ErrorResponse'

const error = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message
    console.log(err)

    // Mongoose casting error
    if(err.name === 'CastError') {
        const message = `Resource not found with id ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    // Mongoose duplicated key
    if(err.code === 11000) {
        const message = `Duplicated field value entered`
        error = new ErrorResponse(message, 400)
    } 

    // Mongoose validation error
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({ 
        success: false,
        error: error.message || 'Server Error'
    })
}

export default error