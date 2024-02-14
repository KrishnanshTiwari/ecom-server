const { login, register } = require('../controllers/authentication');

const routes = (router) => {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
};

module.exports = routes;