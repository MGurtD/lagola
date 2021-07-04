import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'

class User {
 
    initSchema() {
      const schema = new Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        password : {
            type: String,
            required: true,
            minlength: 6,
            select: false
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        name : {
            first_name : String,
            surnames : String
        },
        birth_date : Date,
        icon: String,
        role : {
          type: String,
          enum: ['user', 'manager'],
          default: 'user'
        },
        settings : {
            type: Object
        }
      }, {  timestamps: true })

      schema.pre("save", async function (next) {
        const user = this;
      
        try {
          if (!user.isModified("password")) next();
      
          let hash = await bcrypt.hash(user.password, 10);
          user.password = hash;
          
          next();
        } catch (error) {
          console.error(error);
          next(error);
        }
      });
        
      schema.methods.comparePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
      };

      mongoose.model('user', schema)
    }

    getInstance() {
      this.initSchema()
      return mongoose.model('user')
    }

    getModel() {
      return mongoose.model('user')
    }
    
}

export default User