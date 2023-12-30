import nodemailer from "../config/nodemailer.js";

export const insuranceMailer = (data)=>{
    console.log('LOG : Launching Insurance Mailer');

    let htmlString = nodemailer.renderTemplate({data},'/insurance_mailer.ejs')

    nodemailer.transport.sendMail({
        from : data.email,
        to:"finasourcedir@gmail.com",
        subject : 'New Insurance CLient Recieved',
        html : htmlString
    },(err,info)=>{
        if(err){
            console.log('ERROR : Error in sending mail',err)
            return;
        }
        console.log('INFO : Email Sent Successfully',info);
    })
}