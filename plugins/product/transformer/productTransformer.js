exports.productTransformer = (data) => {

    return {
        status: data.status ? data.status : 0,
        productId: data._id ? data._id : "",
        name: data.name ? data.name : "",
        price: data.price ? data.price : 0,
        discount: data.discount ? data.discount : 0,
        stock: data?.stock ? data.stock : 0,
    };
};

exports.addProductTransformer = (arrayData) => {
    let data = {};
    if (arrayData) {
        data = this.productTransformer(arrayData);
    }
    arrayData = data;
    return arrayData;
};

exports.listProductTransformer = (arrayData) => {
    let data = [];
    if (arrayData && arrayData.length > 0) {
        arrayData.forEach((a) => {
            data.push(this.productTransformer(a));
        });
    }
    arrayData = data;
    return arrayData;
};

