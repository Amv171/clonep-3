const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const sendMail = async (mailOptions) => {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Correo enviado:", info.response);
    } catch (err) {
      console.log("Error al enviar:", err);
    }
  };


module.exports = {sendMail}


