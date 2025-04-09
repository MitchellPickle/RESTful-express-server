const fs = require('fs').promises;
const path = require('path');
const dataFile = path.join(__dirname, '../data/products.json');

// Get all products
async function getAllProducts() {
    try {
        //Reads in the data file with UTF8 format
        const data = await fs.readFile(dataFile, 'utf8');
        //Parses through the JSON and converts it to an array
        return JSON.parse(data).products;
    } catch (err) {
        if(err.code === 'ENOENT') {
            //Returns empty array
            return [];
        }
        throw err;
    }
}

// Get a single product by ID
async function getProductById(id) {
    const products = await getAllProducts();
    return products.find(product => product.id === parseInt(id));
}

// Create a new product
async function createProduct(product) {
    const products = await getAllProducts();

    // Generate new ID (max ID + 1)
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    //newProduct is given new and unique id and given product.
    const newProduct = { id: newId, ...product };
    products.push(newProduct);

    //Converts the products data back to JSON
    await fs.writeFile(
        dataFile,
        JSON.stringify({ products }, null, 2)
    );

    return newProduct;
}

// Update an existing product
async function updateProduct(id, updatedProduct) {
    const products = await getAllProducts();
    //Finds the index of the product using the id parameter.
    const index = products.findIndex(product => product.id === parseInt(id));

    //If the index isn't available/unknown, return null.
    if(index === -1) return null;

    //Returns all products info in the products.json file
    products[index] = {...products[index], ...updatedProduct };

    //Converts the products data back to JSON
    await fs.writeFile(
        dataFile,
        JSON.stringify({ products }, null, 2)
    );

    return products[index];
}

// Delete a product
async function deleteProduct(id) {
    const products = await getAllProducts();
    //Finds the index of the product using the id parameter.
    const index = products.findIndex(product => product.id === parseInt(id));

    //If the index isn't available/unknown, return false.
    if(index === -1) return false;

    //Removes product at the given index.
    products.splice(index, 1);

    //Converts the products data back to JSON array
    await fs.writeFile(
        dataFile,
        JSON.stringify({ products }, null, 2)
    );

    return true;
}

//Exports the asynchronous functions to products.js
module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};