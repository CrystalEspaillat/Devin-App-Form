const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const request = require('superagent');
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

//MAIL CHIMP
const mailchimpInstance = process.env.MAILCHIMPINST;
const listUniqueId = process.env.MAILCHIMPLIST;
const mailchimpApiKey = process.env.MAILCHIMPAPI;


// CLICK EVENT
app.post('/send', (req, res) => {

    // MAILCHIMP
    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed',
          'merge_fields': {
            'FNAME': req.body.firstName,
            'LNAME': req.body.lastName
          }
        })
        .end(function(err, response) {
            if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
            res.send('Signed Up!');
            } else {
            res.send('Sign Up Failed :(');
            }
        });

    // NODEMAILER
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

    // create variable for email submitted
    const replyTo = `${req.body.email}`;
    const subject = `${req.body.firstname}`

    // create a body for the email
    const output = `
        <h3>Contact Details:</h3>
        <ul>  
            <li><strong>Name:</strong> ${req.body.firstname} ${req.body.lastname}</li>
            <li><strong>Email:</strong> ${req.body.email}</li>
            <li><strong>Preferred Plan:</strong> ${req.body.plan}</li>
        </ul>
        <h3>Biggest Struggle:</h3>
        <p>${req.body.struggle}</p>
        <hr>
    `;

    // create email
    var mailOptions = {
        from: process.env.USERSENDS,
        to: process.env.USERGETS,
        replyTo: replyTo,
        subject: 'New Client Application from ' + subject,
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