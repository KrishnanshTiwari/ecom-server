const { addtosellers,editDetails } = require("../controllers/seller");
const { isAuthenticated, isSeller } = require("../middlewares/index");

module.exports = (router) => {
  router.post("/register-seller", isAuthenticated, addtosellers);
  router.patch('/seller/editDetails', isAuthenticated,isSeller, editDetails);
};
