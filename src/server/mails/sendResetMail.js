import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import MailReset from "./MailReset";

export const sendResetMail = async (email, token) => {
  const confirmLink = `${process.env.AUTH_URL}/auth/new-password?token=${token}`;

  const emailHtml = render(<MailReset url={confirmLink} />);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Сброс пароля в EmailSender`,
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);
};
