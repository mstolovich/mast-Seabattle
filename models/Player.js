const {Schema, model} = require('mongoose');


const schema = new Schema({
    
   _id: Schema.Types.ObjectId,

   name: {
      type: Number,
      default: 0
   },
    
   shipsTotalNum: Number,

   shipsDestroyedNum: Number, 

   messages: {
      type: [String],
      default: []
   }
});

module.exports = model('Player', schema);