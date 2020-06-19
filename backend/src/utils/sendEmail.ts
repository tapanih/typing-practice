import * as nodemailer from 'nodemailer';

interface MailInfo {
  messageId: string;
  envelope: {
    from: string;
    to: string[];
  };
}

export const sendEmail = async (recipient: string, confirmLink: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: process.env["ETHEREAL_USER"],
          pass: process.env["ETHEREAL_PASS"]
      }
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const info: MailInfo = await transporter.sendMail({
    from: "Sender name <foo@example.com>",
    to: `Recipient <${recipient}>`,
    subject: "Hello ✔",
    text: "Hello world?",
    html: `
      <html>
        <body>
          <p>Testing Ethereal - click below to confirm your email</p>
          <a href="${confirmLink}">confirm email</a>
        </body>
      </html>
    `,
  });

  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};



