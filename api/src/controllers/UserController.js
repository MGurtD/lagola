import Controller from './Controller'
import UserService from './../services/UserService'
import User from './../models/User'

// Create the service with the model injected
const serviceInstance = new UserService(
    new User().getInstance()
)

class UserController extends Controller {

    constructor(service) {
        super(service)
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.getMe = this.getMe.bind(this)
    }

    getMe(req, res) {
        return res.status(200).json({ success: true, data: req.user })
    }

    async login(req, res) {
        let response = await this.service.login(req.body)
        return this.sendTokenResponse(response, res)
    }

    async register(req, res) {
        let response = await this.service.register(req.body)
        console.log(response)
        return this.sendTokenResponse(response, res)
    }

    async logout(req, res) {
        let response = await this.service.logout(req.body)
        return res.status(200).json({ success: true })
    }

    sendTokenResponse(serviceRes, expressRes) {
        if(serviceRes.statusCode === 200) {
            const options = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            if(process.env.NODE_ENV === 'production') {
                options.secure = true
            }

            return expressRes
                .status(serviceRes.statusCode)
                .cookie('token', serviceRes.token, options)
                .json({ success: true, token: serviceRes.token })
        }
        
        return expressRes.status(serviceRes.statusCode).send(serviceRes)
    }
    
}

// Inject the service and export a new instance of the controller
export default new UserController(serviceInstance)