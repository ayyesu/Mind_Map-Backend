const nodemailer = require("nodemailer");
const adminRequest = async (req, res) => {
  const { username, email, message } = req.body;
  if (!username || !email || !message)
    return res.json({ error: "All field required" });

  try {
    // Creating a Nodemailer transporter
    const transporter = await nodemailer.createTransport({
      // configuring email provider
      host: "imap.gmail.com",
      port: 993,
      service: "gmail",
      auth: {
        user: "iamdanielkissiedu@gmail.com",
        pass: process.env.mail_app_password,
      },
    });
    // Send the email
    await transporter.sendMail(
      {
        from: req.body.email,
        to: "iamdanielkissiedu@gmail.com",
        subject: "MindMap E-Library Publisher Request",
        // text: `Name: ${req.body.username}\nEmail: ${req.body.email}\n\n${req.body.message}`,
        html: `
        <div style="background-color: #2196f3; color: #ffffff; padding: 20px;">
            <h2>MindMap E-Library Publisher Request</h2>
            <p>Name: ${req.body.username}</p>
            <p>Email: ${req.body.email}</p>
            <p>${req.body.message}</p>
        </div>
        `,
      },
      (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: "Error sending email" });
        } else {
          console.log("Email sent: " + info.response);
          res.json({ message: "Request sent successfully" });
        }
      }
    );
  } catch (err) {
    console.log("Error", err.message);
  }
};

module.exports = adminRequest;
