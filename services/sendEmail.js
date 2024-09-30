

const nodemailer = require("nodemailer")
const path = require("path")
const { google } = require("googleapis")

const sendUserCertificateEmail = async (userEmail, { fullName }, certificatePath) => {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    )
    
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

    const accessToken = await oAuth2Client.getAccessToken()

    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      }
    })

    const detailsToSend = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Your Certificate of Completion",
      html: `<div>
                <h1>Hello, ${fullName}</h1>
                <p>Congratulations! Attached is your certificate of completion.</p>
                <h1>Thanks</h1>
             </div>`,
      attachments: [
        {
          filename: `${fullName}_certificate.pdf`,
          path: certificatePath,
        },
      ],
    };

    const result = await mailTransporter.sendMail(detailsToSend)
    console.log("Email sent successfully", result)
    return result;
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

module.exports = sendUserCertificateEmail
