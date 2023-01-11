const nodemailer = require('nodemailer')



const sendVerificationEmail = (email, token) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
		port: 587,
        auth: {
            user: 'hailie.marks@ethereal.email',
            pass: 'ap79Tt3sd6aY3v2FP9'
        }
    });

    let mailOptions = {
        from: '"Emmanuel" hailie.marks@ethereal.email',
        to: email,
        subject: 'Email Verification',
        html: `<p>Please click on the following link to verify your email address:</p>
               <p><a href="http://localhost:3000/verify-email/${token}">Verify Email</a></p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Verification email sent to ${email}`);
        }
    });
}

module.exports={
    sendVerificationEmail
}
