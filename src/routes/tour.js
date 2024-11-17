const mongoose= required('mongoose');

const tourSchema= new mongoose.Schema({
    name: {type:String, required: true},
    price: {type:Number, required:true },
    description: {type: String, requied: true},
    valid: {type: Date, requied:true},
    invalid: {type:Date, requied:true}
});

module.export = module('Tour', tourSchema);
