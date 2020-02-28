const {Schema, model} = require('mongoose');


const schema = new Schema({
   _id: {
      type: Schema.Types.ObjectId   
   },
   name: {
      type: String,
      required: true
   },     
   damaged: {
      type: Number, 
      default: 0
   },
   length:{
      type: Number,
      required: true
   },
   destroyed:{
      type: Boolean,
      default: false
   },
});

module.exports = model('Ship', schema);