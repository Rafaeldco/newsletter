const nodemailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');

const transportador = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "43cce4446fa643", // generated ethereal user
        pass: "b011a700bb0ac2", // generated ethereal password
    },
});

transportador.use('compile', handlebars({
    viewEngine: {
        extname: "handlebars",
        defaultLayout: false
    },
    viewPath: './views/'
}));

module.exports = transportador;