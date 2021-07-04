import mongoose, { Schema } from "mongoose";
import Category from './Category'
import Supplier from './Supplier'

class Article {

    initSchema() {
        const schema = new Schema({
            code: {
                type: String,
                required: true,
                unique: true
            },
            name: {
                type: String,
                required: true
            },
            description: String,
            origin: String,
            active: {
                type: Boolean,
                required: true
            },
            currentStock: Number,
            icon: String,
            categoryPath: String,
            category: {
                type: Schema.Types.ObjectId,
                ref: Category
            },
            supplier: {
                type: Schema.Types.ObjectId,
                ref: Supplier
            },
            pvp: Number,
            price: Number
        }, {  timestamps: true })

        mongoose.model('article', schema)
    }

    getInstance() {
        this.initSchema()
        return mongoose.model('article')
    }
}

export default Article