import { SMTP_PWD, SMTP_USER } from 'constants/index';
import nodemailer from 'nodemailer';
import { log } from 'utils';
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PWD,
  },
});
export const sendMail = async (data, to, subject) => {
  const mainOptions = {
    from: `"da29.online" ${SMTP_USER}`,
    to,
    subject: subject,
    html: data,
  };

  transporter.sendMail(mainOptions, (err, info) => {
    if (err) {
      log.error(err);
      throw err;
    } else {
      log.info('Message sent: ' + info.response);
    }
  });
};
