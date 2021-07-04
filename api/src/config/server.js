import express from 'express'
import cookieParser from 'cookie-parser'
import generateApiRoutes from "./api-routes";
import errorHandler from '../middlewares/error'
import logger from '../middlewares/logger'

const server = express()

server.use(express.json()) 
server.use(cookieParser())
server.use(logger)

generateApiRoutes(server)

server.use(errorHandler)

export default server