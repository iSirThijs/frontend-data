require('dotenv').config();
const express = require('express');
const server = express();

server
	.use('/', express.static('./src/public'))
	.listen(process.env.PORT || 8000);