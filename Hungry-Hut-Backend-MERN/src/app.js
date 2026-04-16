const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const homeRouter = require('./routers/homeRoutes.js')
app.use("/", homeRouter)

module.exports = {app};