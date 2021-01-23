const sgMail = require('@sendgrid/mail')

// const sendgridAPIKey = ''

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rod.danaei@gmail.com',
        subject: 'Welcome,Thanks for signing up',
        text: `Great start for taking control of your tasks, ${name}. Let me know how you get along with the app`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rod.danaei@gmail.com',
        subject: 'Sorry to see you go',
        text: `Thank you, ${name}, for being a member and sorry to see you go, We are wondering if you could some feedback regarding what we could have done better to keep you with us?!!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
// sgMail.send({
//     to: 'danrodvin@gmail.com',
//     from: 'rod.danaei@gmail.com',
//     subject: 'This is my first creation',
//     text: 'I hope this on actually get to you.'
// })