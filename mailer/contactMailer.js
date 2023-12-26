import nodemailer from '../config/nodemailer.js'

export const contactMailer = (user)=>{
    console.log('LOG : Launching Contact Mailer',user);

    let htmlString = nodemailer.renderTemplate({user},'/contact_mailer.ejs')

    nodemailer.transport.sendMail({
        from : user.email,
        to:"pawnalakeholiday@gmail.com",
        subject : 'New Message Recieved',
        html : htmlString
    },(err,info)=>{
        if(err){
            console.log('ERROR : Error in sending mail',err)
            return;
        }
        console.log('INFO : Email Sent Successfully',info);
    })
}

