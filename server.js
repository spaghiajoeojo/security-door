const express = require("express");
const app = express();
const port = 3000;

const { createProxyMiddleware } = require("http-proxy-middleware");

const config = {
  TARGET: process.env.TARGET_URL || 'http://localhost',
  AUTH_URL: process.env.AUTH_URL || 'http://localhost/auth',
};


console.log(config);

app.all(
  '*',
  async (req, res, next) => {
    const { status } = await fetch(config.AUTH_URL, {
      headers: req.headers,
    });
    if (status === 200) {
      next();
    } else {
      res.status(status);
      res.end('Access Denied');
    }
  },
  createProxyMiddleware({
    target: config.TARGET,
    changeOrigin: true,
  })
);




app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
