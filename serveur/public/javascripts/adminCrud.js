function createProduct(name, description, price, curency, stock, marque, categorie, logo, photo) {
    global.dbo.collection("products").insert({
        name,
        description,
        price,
        curency,
        stock,
        marque,
        categorie,
        logo,
        photo
    })
}

function listProductsAdmin(callback) {
    global.dbo.collection("products").find().toArray(function (err, result) {
        if (err) throw err;
        return callBack(result)
    })
}

function updateProduct(id, name, description, price, curency, stock, marque, categorie, logo, photo) {
    global.dbo.collection("products").update({
        id
    }, { 
        $set: {
            name,
            description,
            price,
            curency,
            stock,
            marque,
            categorie,
            logo,
            photo
        }
    })
}

function deleteProduct(id) {
    global.dbo.collection("products").remove({
        id
    })
}

module.exports = {
    createProduct,
    listProductsAdmin,
    updateProduct,
    deleteProduct
}