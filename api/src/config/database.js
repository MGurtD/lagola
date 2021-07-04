import mongoose from 'mongoose'

class Connection {

    constructor() {
        this.connect()
    }

    connect() {
        const host = process.env.MONGODB_HOST || 'localhost:27017'
        const db = process.env.MONGODB_DBNAME || 'lagola'
        const user = process.env.MONGODB_USER || ''
        const pass = process.env.MONGODB_PASS || ''
        const credentials = user.length > 0 && pass.length > 0 ? `${user}:${pass}@` : ''

        let mongodbUri = `mongodb+srv://${credentials}${host}/${db}?retryWrites=true&w=majority`

        mongoose.Promise = global.Promise
        mongoose.set('useNewUrlParser', true)
        mongoose.set('useFindAndModify', true)
        mongoose.set('useCreateIndex', true)
        mongoose.set('useUnifiedTopology', true)
        mongoose.set('useFindAndModify', false)
        mongoose.connect(mongodbUri).then(response => {
            console.log('mongo-db connected')
        }).catch(err => {
            console.error('mongo-db connection error: ', mongodbUri, err)
        })
    }
}

export default Connection