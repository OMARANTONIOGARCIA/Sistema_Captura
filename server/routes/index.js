const express = require('express');
const app = express();


// Configurando views del webservices
app.use(require('./view'));

app.use(require('./login'));

app.use(require('./Usuario'));
app.use(require('./Estudiante'));
app.use(require('./Padres'));
app.use(require('./Salida'));
app.use(require('./upload'));

module.exports = app;