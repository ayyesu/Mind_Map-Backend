const nodemailer = require('nodemailer');
const adminRequest = async (req, res) => {
    const {username, email, message} = req.body;
    if (!username || !email || !message)
        return res.json({message: 'All field required'});

    try {
        // Creating a Nodemailer transporter
        const transporter = await nodemailer.createTransport({
            // configuring email provider
            host: 'imap.gmail.com',
            port: 993,
            service: 'gmail',
            auth: {
                user: 'iamdanielkissiedu@gmail.com',
                pass: process.env.mail_app_password,
            },
        });
        // Send the email
        await transporter.sendMail(
            {
                from: email,
                to: 'iamdanielkissiedu@gmail.com',
                subject: 'Request to be an Admin',
                text: `Name: ${req.body.username}\nEmail: ${req.body.email}\n\n${req.body.message}`,
            },
            (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({error: 'Error sending email'});
                } else {
                    console.log('Email sent: ' + info.response);
                    res.json({message: 'Email sent successfully'});
                }
            },
        );
    } catch (err) {
        console.log('Error', err.message);
    }
};

module.exports = adminRequest;