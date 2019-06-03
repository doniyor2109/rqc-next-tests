const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'secure.emailsrvr.com',
  port: 465,
  auth: {
    user: 'no-reply@rqc.ru',
    pass: 'oNie5Gi8un8oogog',
  },
  secure: true,
  logger: true,
});

const send = ({ email, name, letter }) => {
  const from = name && email ? `${name} <${email}>` : `${name || email}`;


  const body = `
    ЗАЯВКА НА ПОСТУПЛЕНИЕ

    Ступень обучения: ${letter.stepen}
    ФИО: ${letter.name}
    E-mail: ${letter.email}
    Телефон: ${letter.phone}
    ВУЗ: ${letter.vuz}
    Факультет: ${letter.faculty}
    
    Если вам интересно определенное направление работы РКЦ, укажите это направление и научного руководителя, к которому вы хотели бы попасть:
    
    Направление работы: ${letter.subject}
    Научный руководитель: ${letter.teamlead}
    
    Дополнительные сведения о кандидате: 
    ${letter.additional}
  `;
  const message = {
    from: 'Сайт РКЦ <no-reply@rqc.ru>',
    to: ['sorokinvj@gmail.com'],
    subject: `Новая заявка на поступление от ${from}`,
    text: body,
    replyTo: from,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) => (error ? reject(error) : resolve(info)));
  });
};

module.exports = send;

// 'students@rqc.ru'
