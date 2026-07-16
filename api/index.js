const app = require('../server/src/app');

module.exports = (req, res) => {
  if (!req.url) {
    req.url = '/api/v1';
  }
  if (!req.url.startsWith('/api')) {
    req.url = '/api' + req.url;
  }
  return app(req, res);
};
