const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bearSchema = new Schema({
    type: {
        type: String,
        enum: ['Koala', 'Panda', 'Brown', 'Black', 'Polar'],
        default: 'Koala',
    },
    name: {
        type: String,
        default: 'Franz',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

module.exports = mongoose.model('Bear', bearSchema)
