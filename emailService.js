const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// TODO add from/to emails to .env.length
const sendEmail = async (emailMessage) => {
  const msg = {
    to: "iskrzycki@gmail.com",
    from: "powiadomienia@iskrzycki.com",
    subject: "Your daily job report",
    html: emailMessage,
  };

  return sgMail
    .send(msg)
    .then(() => {
      Promise.resolve();
    })
    .catch((error) => {
      Promise.reject(error);
    });
};

exports.sendEmail = sendEmail;

// USAGE
// try {
//   await sendEmail("test email");
//   console.log("Email sent");
// } catch (e) {
//   console.log(e);
// }
