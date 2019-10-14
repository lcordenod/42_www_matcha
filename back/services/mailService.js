let nodemailer = require("nodemailer");

module.exports = {
  registerMail: (mail, username, link) => {
    var message =
      `
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <p>Hi ` +
      username +
      `,</p>
        <br>
        <p>We have received your registration on Matcha.</p>
        <p>We hope you will find what you are looking for on our platform.</p>
        <p>To get started on Matcha, please make sure to validate the following link: <a href="` +
      link +
      `">Click here</a></p>
        <br>
        <p>See you soon on Matcha.</p>
      </body>
    </html>`;

    let transporter = nodemailer.createTransport({
      sendmail: true,
      newline: "unix",
      path: "/usr/sbin/sendmail"
    });
    transporter.sendMail(
      {
        from: "registration@matcha.com",
        to: mail,
        subject: "Welcome to Matcha",
        html: message,
        contentType: "text/html"
      },
      (err, info) => {
        //console.log(info.envelope);
      }
    );
  },

  forgotPasswordMail: (mail, username, link) => {
    var message =
      `
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <p>Hi ` +
      username +
      `,</p>
        <br>
        <p>We have received your password reset request on Matcha.</p>
        <p>Don't worry we got you covered ;)</p>
        <p>To reset your password on Matcha, please visit the following link: <a href="` +
      link +
      `">Click here</a></p>
        <br>
        <p>See you soon on Matcha.</p>
      </body>
    </html>`;

    let transporter = nodemailer.createTransport({
      sendmail: true,
      newline: "unix",
      path: "/usr/sbin/sendmail"
    });
    transporter.sendMail(
      {
        from: "noreply@matcha.com",
        to: mail,
        subject: "Matcha - Reset password",
        html: message,
        contentType: "text/html"
      },
      (err, info) => {
        console.log(info.envelope);
      }
    );
  }
};
