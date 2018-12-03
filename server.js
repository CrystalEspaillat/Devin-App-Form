const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
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


app.get('/', (req, res) => {
  res.render('form');
});

app.post('/send', (req, res) => {
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

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_AUTH_USER,
        clientId: process.env.GMAIL_AUTH_CLIENT_ID,
        clientSecret: process.env.GMAIL_AUTH_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_AUTH_REFRESH_TOKEN,
        accessToken: process.env.GMAIL_AUTH_ACCESS_TOKEN,
        expires: 1484314697598
    }
});

  // setup email data with unicode symbols
  var mailOptions = {
      from: '"Landing Page" <devin@devinphysique.coach>', // sender address
      to: 'devin@devinphysique.coach', // list of receivers
      subject: 'New Client Application from Lead Page', // Subject line
      text: 'Someone applied for coaching with Devin. See details below.', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('thanks');
  });
  });

  sendEmail = (emailData) => {

    var auth = {
        "type": GMAIL_AUTH_TYPE,
        "user": GMAIL_AUTH_USER,
        "clientId": GMAIL_AUTH_CLIENT_ID,
        "clientSecret": GMAIL_AUTH_CLIENT_SECRET,
        "refreshToken": GMAIL_AUTH_REFRESH_TOKEN,
        "accessToken": GMAIL_AUTH_ACCESS_TOKEN
    };

    var transporter = nodemailer.createTransport({
        service: GMAIL_SERVICE,
        auth
    });

    logger.info(`Attempting to send email from ${emailData.from}`);
    transporter
        .sendMail(emailData)
        .then(info => console.log(`Email sent: ${info.response}`))
        .catch(err => console.log(`Problem sending email: ${err}`));
  }

app.listen(process.env.PORT || 5000, () => console.log('Server started...'));