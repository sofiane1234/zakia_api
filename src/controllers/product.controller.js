const Product = require('../models/product.model');

exports.createProduct = (req, res) => {
  Product.create(req.body)
    .then(product => {
      res.send(product)
    })
    .catch(err => res.status(404).send(err))
}

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const error = new Error("product not found")
      error.status = 404 
      throw error;   
    }
    res.send({
      success: true,
      product: product
    })
  }
  catch (err) {
    next(err);
  }
}

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(
    //   {
    //   stock: {
    //     $gt: 0
    //   }
    // }
    );
    //FOR
    //.filter
    // const filteredProducts = products.filter((product) => {
    //   return req.body.searchString && 
    //   product.name.includes(req.body.searchString ? req.body.searchString.toLowerCase() : "") 
    //   && 
    //     product.description.includes(req.body.searchString ? req.body.searchString.toLowerCase() : "")
    //   &&
    //   req.body.range && product.price >= req.body.range[0] && product.price <= req.body.range[1]
    // })
    res.send({
      success: true,
      products:products
    });
  }
  catch (err) {
    res.status(400).send(err);
  }
} 