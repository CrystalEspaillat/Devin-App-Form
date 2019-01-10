const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').load();
const app = express();


// VIEW ENGINE
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// SERVE STATIC FILES
app.use('/public', express.static(path.join(__dirname, 'public')));

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DISPLAY PAGES
app.get('/', (req, res) => {
    res.render('form');
});
app.get('/thanks', (req, res) => {
    res.render('thanks');
});
app.get('/privacy', (req, res) => {
    res.render('privacy');
});

// NODEMAILER
app.post('/send', (req, res) => {

    // use nodemailer
    var smtpTransport = nodemailer.createTransport( {
        service: "Gmail",
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.USEREMAIL,
            pass: process.env.USERPASSWORD
        }
    });

    // create a body for the email
    const output = `
        <h3>Contact Details:</h3>
        <ul>  
            <li><strong>Name:</strong> ${req.body.fullname}</li>
            <li><strong>Email:</strong> ${req.body.email}</li>
            <li><strong>Preferred Plan:</strong> ${req.body.plan}</li>
        </ul>
        <h3>Biggest Struggle:</h3>
        <p>${req.body.struggle}</p>
        <hr>
        <p> This email came from https://devinphysique-clientapp.herokuapp.com/ </p>
    `;

    // create email
    var mailOptions = {
        from: process.env.USEREMAIL,
        to: process.env.USEREMAIL,
        subject: 'New Client Application!',
        text: 'You have a new Client Application to review!',
        html: output
    }

    // send the mail
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response);
            //res.redirect('/thanks');
        }

        smtpTransport.close(); // shut down the connection pool, no more messages

    });
    
    // Show thank you page
    res.redirect('../thanks');

});

app.listen(process.env.PORT || 5000, () => console.log('Server started...'));