import mongoose, { Schema } from "mongoose";

class Supplier {

    initSchema() {
        const schema = new Schema({
            name: {
                type: String,
                required: true,
                unique: true
            },
            description: String,
            address: {
                country: String,
                county: String,
                postalCode: { type: String, max: 6 },
                city: String,
                street: String
            },
            supplyDays: Number,
        }, {  timestamps: true })

        mongoose.model('supplier', schema)
    }

    getInstance() {
        this.initSchema()
        return mongoose.model('supplier')
    }
}

export default Supplier