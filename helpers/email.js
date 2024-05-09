const nodemailer = require("nodemailer");
require("dotenv").config();

 function formatValue(value) {
   return new Intl.NumberFormat("de-DE", {
     style: "currency",
     currency: "EUR",
   }).format(value);
 }

 function buildMail(cart, name, value) {
   const mailMsg =
     `NEXT STORE

  Dear ${name}
  
  Thank You for your purchase on our online store.
  
  your items will be delivery very soon.

  ORDER INFO:

  ` +
     cart.map(
       (item) =>
         `NAME: ${item.name}
      
  PRICE:  ${item.price}
    
  QUANTITY:  ${item.qnt}
      
----------------------------------

`
     ) +
     `
TOTAL INVOICE: ${formatValue(value)} 
  `;

  sendEmail(mailMsg.replaceAll(",", "  "));
 }


function sendEmail(body) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: "ando.thiago@gmail.com",
    subject: "Sending Email using Node.js",
    text: body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

exports.buildMail = buildMail;
