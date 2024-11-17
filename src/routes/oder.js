const mongoose= required('mongoose');

const oderSchema= new mongoose.Schema({
    name: {type:String,required: true},
    quantity: {type:String, required: true},
    status:{type: Boolean, reqired: true, default: false},
    createday:{type: Date, requied: true}
});

module.export= mongoose.module('order', orderSchema);
