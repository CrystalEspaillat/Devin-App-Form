const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
require('dotenv');

const app = express();

// VIEW ENGINE
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
console.log(path.join(__dirname, 'views'));

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

// FORM SUBMIT
app.post('/send', (req, res) => {

    // use nodemailer
    var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        host: 'smtp.example.com',
        port: 465,
        secure: true,
        auth: {
            user: "devinphysiqueonline@gmail.com",
            pass: "d3dicat3d"
        }
    });

    // create a body for the email
    const output = `
        <h3>Contact Details:</h3>
        <ul>  
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Preferred Plan: ${req.body.plan}</li>
            <li>Age Range: ${req.body.age}</li>
            <li>Current Exercise Habit: ${req.body.exercise}</li>
            <li>Readiness (1-5): ${req.body.rating}</li>
        </ul>
        <h3>Biggest Struggle:</h3>
        <p>${req.body.struggle}</p>
    `;

    // create email
    var mailOptions = {
        from: "devinphysiqueonline@gmail.com",
        to: "devinphysiqueonline@gmail.com",
        subject: 'New Client Application!',
        text: 'You have a new Client Application to review!',
        html: output
    }

    // send the mail
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
        // if you don't want to use this transport object anymore, uncomment following line
        smtpTransport.close(); // shut down the connection pool, no more messages
        callback();
    });

    res.render('thanks');

});

// /////////////////////////////////////////////

//   // create reusable transporter object using the default SMTP transport
//   var transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
    
//     auth: {
//         type: 'OAuth2',
//         user: process.env.GMAIL_AUTH_USER,
//         clientId: process.env.GMAIL_AUTH_CLIENT_ID,
//         clientSecret: process.env.GMAIL_AUTH_CLIENT_SECRET,
//         refreshToken: process.env.GMAIL_AUTH_REFRESH_TOKEN,
//         accessToken: process.env.GMAIL_AUTH_ACCESS_TOKEN,
//         expires: 1484314697598
//     }
// });

//   // setup email data with unicode symbols
//   var mailOptions = {
//       from: '"Landing Page" <devinphysiqueonline@gmail.com>', // sender address
//       to: 'devinphysiqueonline@gmail.com', // list of receivers
//       subject: 'New Client Application from Lead Page', // Subject line
//       text: 'Someone applied for coaching with Devin. See details below.', // plain text body
//       html: output // html body
//   };

//   // send mail with defined transport object
//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           return console.log(error);
//       }
//       console.log('Message sent: %s', info.messageId);   
//       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//       res.render('thanks');
//   });
//   });

//   sendEmail = (emailData) => {

//     var auth = {
//         "type": GMAIL_AUTH_TYPE,
//         "user": GMAIL_AUTH_USER,
//         "clientId": GMAIL_AUTH_CLIENT_ID,
//         "clientSecret": GMAIL_AUTH_CLIENT_SECRET,
//         "refreshToken": GMAIL_AUTH_REFRESH_TOKEN,
//         "accessToken": GMAIL_AUTH_ACCESS_TOKEN
//     };


//     var smtpTransport = nodemailer.createTransport("SMTP", {
//         service: GMAIL_SERVICE,
//         // connectionTimeout : "7000",
//         // greetingTimeout : "7000",
//         auth
//     });

//     logger.info(`Attempting to send email from ${emailData.from}`);
//     transporter
//         .sendMail(emailData)
//         .then(info => console.log(`Email sent: ${info.response}`))
//         .catch(err => console.log(`Problem sending email: ${err}`));
//   }

app.listen(process.env.PORT || 5000, () => console.log('Server started...'));