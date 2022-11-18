const mongoose = require("mongoose")
const uuidv4 = require("uuid-v4")
const Schema = mongoose.Schema


const customerSchema = new Schema({
    id: { type: String, auto: true, index: true, default: uuidv4 },
    customerName: { type: String },
    productName: { type: String },
    status: { type: String, default: "1" },
    customerType: { type: String},
    createdAt: {type: Date, default: () => Date.now()},
}, {timestamps: true});

customerSchema.statics.createOrUpdateEntry = function(customerName,productName,status,customerType){
    try{
        let doc = {
            "customerName":customerName,
            "productName":productName,
            "status":status,
            "customerType":customerType
        };
        let options = {
            new:true,
            upsert:true,
            setDefaultsOnInsert:true
        };
        if (doc.id == null) return this.create(doc);
        else
            return this.findOneAndUpdate({id:doc.id},doc,options).lean().exec();

    }catch (err) {
        console.log(err)
    }

}
const customerInfo = mongoose.model("customers",customerSchema);
module.exports = customerInfo;
