import nodemailer from "../config/nodemailer.js";

export const loanMailer = (data)=>{
    console.log('LOG : Launching Loan Mailer');

    let htmlString = nodemailer.renderTemplate({data},'/loan_mailer.ejs')

    nodemailer.transport.sendMail({
        from : data.email,
        to:"finasourcein@gmail.com",
        subject : 'New Loan CLient Recieved',
        html : htmlString
    },(err,info)=>{
        if(err){
            console.log('ERROR : Error in sending mail',err)
            return;
        }
        console.log('INFO : Email Sent Successfully',info);
    })
}