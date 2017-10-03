import fs from 'fs';
import express from 'express';
import http from 'http';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';

var webpack = require('webpack');
var webpackConfig = require('../webpack.config');
var compiler = webpack(webpackConfig);

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

const routes = [
  '/',
];

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler, {
 'log': false,
 'path': '/__webpack_hmr',
 'heartbeat': 10 * 1000
}));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

server.listen(port, err => {
  console.log(err || `Listening on port ${port}`);
});
