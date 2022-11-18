const rpcConfig = require('./rpc-config');

class customerClientRPC {
    constructor(messageProto, grpc) {
        this.grpc = grpc;
        this.customerMessageProto = grpc.load(messageProto);
    }

    CustomerAddLogEntry(customerName, productName, status, customerType) {
        return new Promise((resolve, reject) => {
            try {
                let customerClient = new this.customerMessageProto.Customer(rpcConfig.rpc.client.customer, this.grpc.credentials.createInsecure());
                console.log("customerClient")
                let request = {
                    customerName: customerName,
                    productName: productName,
                    status: status,
                    customerType: customerType,
                };
                customerClient.CustomerAddLogEntry(request, (err, response) => {
                    if (err != null)
                        reject(err);
                    else {
                        console.log(response)
                        if (response.result) {
                            resolve(JSON.parse(response.jsonData));
                        } else {
                            resolve(null);
                        }
                    }
                });
            } catch (ex) {
                console.log('USER-MANAGER-RPC-CLIENT (GetUser) exception: ');
                console.log(ex);
            }
        });
    }
}

module.exports = customerClientRPC;
