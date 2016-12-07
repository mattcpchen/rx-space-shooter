import path from 'path';
import express from 'express';


module.exports = function() {
  // express
  const app = express();
  app.set('port', process.env.PORT || 8080);

  // static routes
  app.use(express.static( path.join(__dirname, '../public/') ));
  app.use(express.static( path.join(__dirname, '../dist/') ));

  // routes
  app.get('/', function(req, res) {
    const indexHtmlPath = path.join(__dirname, '../public/index.html');
    res.sendFile(indexHtmlPath);
  });


  // webpack with HMR
  if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.client.config.babel');
    const compiler = webpack(webpackConfig);
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));
  }
  
  return app;
};

