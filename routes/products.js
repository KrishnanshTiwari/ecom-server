const {
  getAllProducts,
  getProduct,
  deleteProduct,
  addProduct,
  getProductsOfSeller,
} = require("../controllers/products");

const routes = (router) => {
  router.post("/addtoproducts", addProduct);
  router.get("/getproducts", getAllProducts);
  router.delete("/deleteproduct/:id", deleteProduct);
  router.get("/productdetail/:id", getProduct);
  router.get("/sellerproductlist/:id", getProductsOfSeller);
};

module.exports = routes;
