import mongoose, { Schema } from "mongoose";

class Category {

    initSchema() {
        const schema = new Schema({
            name: {
                type: String,
                required: true,
                unique: true
            },
            description: String,
            active: {
                type: Boolean,
                required: true
            },
            nonConsumptionNotificationDays: Number,
            icon: String,
            parent: {
                type: Schema.Types.ObjectId,
                ref: Category
            }
        }, {  timestamps: true })

        mongoose.model('category', schema)
    }

    getInstance() {
        this.initSchema()
        return mongoose.model('category')
    }
}

export default Category