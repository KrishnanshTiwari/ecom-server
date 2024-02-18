const { addtosellers } = require("../controllers/seller");
const { isAuthenticated } = require("../middlewares/index");

module.exports = (router) => {
  router.post("/register-seller", isAuthenticated, addtosellers);
};
