exports.vendorTransformer = (data) => {

    return {
        status: data.status ? data.status : 0,
        vendorId: data.id ? data.id : "",
        name: data.name ? data.name : "",
        email: data.email ? data.email : "",
        phone: data.phone ? data.phone : "",
        address: data.address ? data.address : "",
        password: data.password ? data.password : "",
    };
};


exports.addVendorTransformer = (arrayData) => {
    let data = {};
    if (arrayData) {
        data = this.vendorTransformer(arrayData);
    }
    arrayData = data;
    return arrayData;
};



exports.vendorSignInTransformer = (data) => {

    return {
        status: data.status ? data.status : 0,
        vendorId: data.id ? data.id : "",
        name: data.name ? data.name : "",
        email: data.email ? data.email : "",
        phone: data.phone ? data.phone : "",
        address: data.address ? data.address : "",
    };
};

exports.vendorsigninTransformer = (arrayData) => {
    let data = {};
    if (arrayData) {
        data = this.vendorSignInTransformer(arrayData);
    }
    arrayData = data;
    return arrayData;
};

exports.listVendorTransformer = (arrayData) => {
    let data = [];
    if (arrayData && arrayData.length > 0) {
        arrayData.forEach((a) => {
            data.push(this.vendorSignInTransformer(a));
        });
    }
    arrayData = data;
    return arrayData;
};