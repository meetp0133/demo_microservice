exports.orderTransformer = (data) => {
    return {
        status: data.status ? data.status : 0,
        orderId: data._id ? data._id : "",
        vendorId: data.vendorId ? data.vendorId : "",
        productId: data.productId ? data.productId : "",
        orderStatus: data.orderStatus ? data.orderStatus : "",
        paymentStatus: data?.paymentStatus ? data.paymentStatus : false,
    };
};

exports.addOrderTransformer = (arrayData) => {
    let data = {};
    if (arrayData) {
        data = this.orderTransformer(arrayData);
    }
    arrayData = data;
    return arrayData;
};

exports.listOrderTransformer = (arrayData) => {
    let data = [];
    if (arrayData && arrayData.length > 0) {
        arrayData.forEach((a) => {
            data.push(this.orderTransformer(a));
        });
    }
    arrayData = data;
    return arrayData;
};

