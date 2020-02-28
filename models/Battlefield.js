const {Schema, model} = require('mongoose')

const schema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
     },
    xcord: {
        type: Number, 
        required: true
    },
    ycord: {
        type: Number, 
        required: true
    },
    occupied: {
        type: Boolean, 
        default: false
    },
    occupiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Ship' 
    },
    shooted: {
        type: Boolean, 
        default: false 
    }
})

module.exports = model('Cell', schema)