const nodemailer = require('nodemailer')



const sendVerificationEmail = (email, token, id) => {
    let transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "88aecfc30136f7",
          pass: "403402a34110e6"
        }
      });


    let mailOptions = {
        from: 'noreply@gmail.com',
        to: email,
        subject: 'Email Verification',
        html: `<p>Please click on the following link to verify your email address:</p>
               <p><a href="http://localhost:3000/api/${id}/verify/${token}">Verify Email</a></p>`
    };
    transport.sendMail(mailOptions, (error, info) => {
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
