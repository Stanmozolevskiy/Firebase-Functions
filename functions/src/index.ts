import * as functions from "firebase-functions";
const sgMail = require("@sendgrid/mail");
const cors = require('cors');
cors({
  origin: "*"
})


exports.emailMessage = functions.https.onCall((data) => {
    sgMail.setApiKey(functions.config().someservice.apikey);

   const msg = {
    to: functions.config().someservice.to,
    from:functions.config().someservice.from,
    replyTo: data.sender,
    subject: `${data.name} sent you email`,
    text: data.message,
    html: `<strong>${data.message}</strong>`,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error:any) => {
      console.error(error.message);
    })
    return{"status": "sucess", data: data};
});
