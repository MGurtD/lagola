import Service from './Service'
import ErrorResponse from '../helpers/ErrorResponse'
import jwt from 'jsonwebtoken'

class UserService extends Service {
    constructor(model) {
        super(model)
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.getSignedJwtToken = this.getSignedJwtToken.bind(this)
    }

    async register(data) {     
        let exists = await this.model.exists({ email : data.email})
        if(exists) {
            throw new ErrorResponse(`The email ${data.email} already exists`, 409)
        }

        let user = await this.model.create(data);                
        if (user){
            return {
                success: true,
                statusCode: 200,
                token: this.getSignedJwtToken(user._id)
            };
        }
    }

    async login(data) {
        let { email, password } = data
        let user = await this.model.findOne({ email }).select('+password')

        if(!user || !user.comparePassword(password)) {
            throw new ErrorResponse(`Incorrect email or password`, 401)
        }

        return {
            success: true,
            statusCode: 200,
            token: this.getSignedJwtToken(user._id)
        }
    }

    async logout(data) {

    }

    getSignedJwtToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE
        })
    }
}

export default UserService