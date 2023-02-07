const nodemailer = require('nodemailer')



const sendVerificationEmail = (email, token) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
		port: 587,
        auth: {
            user: '	mertie.ankunding41@ethereal.email',
            pass: '	Gnzrc4uvU7BrREVB4a'
        }
    });

    let mailOptions = {
        from: '"Emmanuel" 	mertie.ankunding41@ethereal.email',
        to: email,
        subject: 'Email Verification',
        html: `<p>Please click on the following link to verify your email address:</p>
               <p><a href="http://localhost:3000/api/verify-email?token=${token}">Verify Email</a></p>`
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
