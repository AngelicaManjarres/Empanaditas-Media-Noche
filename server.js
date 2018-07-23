/*Variables*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const port = process.env.PORT || 3000;

/*Puerto.*/
app.listen(port, () => {
	console.log('Server is up on ' + port);
})


/*Static folder for assets*/
app.use('/public', express.static('public'));

/*Middleware handlebars*/
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


/*Middleware Body Parse*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*Enrutamiento*/
app.get('/', (req, res) => {
	res.render('index');
})

app.post('/send', (req, res) => {
	const output= `
	<p>Nuevo mensaje del formulario de Empanaditas Medianoche</p>
	<h3>Nombre: ${req.body.nombre}</h3>
	<h4>E-mail ${req.body.email}</h4>
	<h4>Teléfono ${req.body.telefono}</h4>
	<h3>Mensaje: </h3>
	<p>${req.body.mensaje}</p>
	`;

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.live.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'angelica_maria91@hotmail.com', // generated ethereal user
            pass: 'Sara2356' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Empanaditas Medianoche" <angelica_maria91@hotmail.com>', // sender address
        to: 'angelica_maria91@hotmail.com', // list of receivers
        subject: 'Empanaditas Medianoche contacto', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

				res.render('index', {enviado:'Su mensaje fue enviado. Gracias por contactarnos.'})

    });

	});

});
