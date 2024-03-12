const {
  getAllProducts,
  getProduct,
  deleteProduct,
  addProduct,
  getProductsOfSeller,
  getOrderedProductsofSeller,
} = require("../controllers/products");
const { isAuthenticated, isSeller } = require("../middlewares/index");

const routes = (router) => {
  router.post("/seller/addtoproducts", isAuthenticated, isSeller, addProduct);
  router.get("/getproducts", getAllProducts);
  router.delete(
    "/seller/deleteproduct/:id",
    isAuthenticated,
    isSeller,
    deleteProduct
  );
  router.get("/productdetail/:id", getProduct);
  router.get(
    "/seller/sellerproductlist",
    isAuthenticated,
    isSeller,
    getProductsOfSeller
  );
  router.get(
    "/seller/sellerorderedproduct",
    isAuthenticated,
    isSeller,
    getOrderedProductsofSeller
  );
};

module.exports = routes;
