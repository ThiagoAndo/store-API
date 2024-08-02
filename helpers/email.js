const nodemailer = require("nodemailer");
require("dotenv").config();
function formatValue(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
function buildMail(cart, name, value, email) {
  const mailMsg =
    `NEXT STORE

  Dear ${name}
  
  Thank You for your purchase on our online store.
  
  your items will be delivery very soon.

  ORDER INFO:

  ` +
    cart.map(
      (item) =>
        `PRODUCT: ${item.name}
      
  PRICE:  ${formatValue(+item.price)}
    
  QUANTITY:  ${item?.qnt || item?.quantity}
      
----------------------------------

`
    ) +
    `
TOTAL INVOICE: ${formatValue(+value)} 
  `;

  sendEmail(mailMsg.replaceAll(",", "  "), email);
}
function sendEmail(body, email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
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
