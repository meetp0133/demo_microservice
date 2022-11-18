const customerModel = require("./model/customer-model")
const rpcConfig = require('../../rpc/rpc-config');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const customerMessageProto = grpc.loadPackageDefinition(
    protoLoader.loadSync('../../rpc/customer-message.proto', {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

let server = new grpc.Server();

server.addService(customerMessageProto.Customer.service, {
    /*CustomerAddLogEntry: async function (call, callback) {
        try {
            const customerName = call.request.customerName;
            const productName = call.request.productName;
            const status = call.request.status;
            const customerType = call.request.customerType;
            let addCustomer = await customerModel.createOrUpdateEntry(customerName, productName, status, customerType);
            callback(null, {
                result: true,
                jsonData: JSON.stringify(addCustomer)
            });

        } catch (ex) {
            callback(null, {
                result: false,
                jsonData: ex.message
            })
        }
    }*/
})

server.bind(rpcConfig.rpc.server.customer,grpc.ServerCredentials.createInsecure());
module.exports.run = async () =>{
    new Promise((resolve,reject)=>{
        console.log("Vendor's customer manager started on",rpcConfig.rpc.server.customer)
    })
}