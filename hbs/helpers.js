const hbs = require('hbs');

hbs.registerHelper('getAnios', () => {
    return new Date().getFullYear()

});