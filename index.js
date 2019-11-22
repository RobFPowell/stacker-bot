const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')

const app = express();
var http = require('https');


app.use('/', express.static(__dirname));
app.use('/chat.yaml', express.static(__dirname + '/../chat.yaml'));
app.use('/web.js', express.static(__dirname + '/../../lib/web.js'));
app.use('/types', express.static(__dirname + '/../../lib/ext/types'));
app.use(bodyParser())

app.listen(3000, () => {
  console.log('Yve server example listening on port 3000');
});

var Mailchimp = require('mailchimp-api-v3')
 
var mailchimp = new Mailchimp(process.env.MAILCHIMP);
 
app.get('/emailSignup/*', function (req, res) {
	console.log(req.params[0])
	mailchimp.post('/lists/2748541095/members/', {
		email_address : req.params[0],
		status : 'pending'
	 	})
	.then(function(results) {
	 	console.log(results)
	 	res.send('Newsletter signup successful for ' + results['email_address'])
	})
	.catch(function (err) {
	 	console.log(err)
	 	res.send('Error signing up for newsletter')
	})
})

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  	user: process.env.EMAIL,
  	pass: process.env.EMAIL_PASSWORD
    // user: 'rob.freeman.powell@gmail.com',
    // pass: 'Michigan@70'
  }
});

app.post('/sendMail', function (req, res) {
	emailInfo = Object.keys(req.body)[0].split('|',2)
	var mailOptions = {
		from: process.env.EMAIL,
		to: emailInfo[0],
		subject: 'Chat bot - Contact us',
		text: emailInfo[1]
	};
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
	return 'it tested'
})