// import nodeoutlook from "nodejs-nodemailer-outlook"


// export function sendEmail(dest, message) {
//     nodeoutlook.sendEmail({
//         auth: {
//             user: "saraelhoseny@outlook.com",
//             pass: "elhoseny123"
//         },
//         from: 'saraelhoseny@outlook.com',
//         to: dest,
//         subject: "hello sara it's verifaction email",
//         html: message,
//         onError: (e) => console.log(e),
//         onSuccess: (i) => console.log(i)
//     }


//     );
// }

import nodemailer from "nodemailer";
export  async function sendEmail(dest, message) {
    let transporter = nodemailer.createTransport({
        service: "outlook",
        secure: false,
        auth: {
           user: "saraelhoseny@outlook.com", 
           pass: "elhoseny123",
        },

    });
    let info = await transporter.sendMail({
        from:`artist application " <saraelhoseny@outlook.com>`,
        to: dest,
        subject: "hello",
        text:"hello world",
        html:message,
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    });
}




