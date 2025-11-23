const nodemailer = require('nodemailer');

const sendEmail = async(toString, subject, html) => {
    const transporter =  nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false, // Fix for local SSL
        },
    });
     await transporter.sendMail(
        {
            from: process.env.EMAIL_USER,
            to: toString,
            subject: subject,
            html: html
        }
     );
};

module.exports = {sendEmail};