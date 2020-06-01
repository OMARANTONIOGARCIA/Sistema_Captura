const express = require('express');
const app = express();


// Configurando views del webservices
app.use(require('./view'));
app.use(require('./Usuario'));
app.use(require('./login'));


module.exports = app;