import nodemailer from "nodemailer"
import ejs from 'ejs'
import path from 'path'
const __dirname = path.resolve(path.dirname(''));

let transport = nodemailer.createTransport({
    service : "gmail",
    host : "smtp.gmail.com",
    port : 587,
    secure : false,
    auth : {
        // user : 'ajit.amane1901@gmail.com',
        // pass : 'qchkludmcdmlwuyc'
        // user : 'er.amantiwari.nodeMailer@gmail.com',
        // pass : 'gzdblgruttmikgqq'
        user : "pawnalakeholiday@gmail.com",
        pass : "qxrqnelzrrtwyaor"

    },
    tls :{
        rejectUnauthorized :true
    }
});

let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'/views/mailer',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('Error in rendering template',err);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}


export default  {
    transport:transport,
    renderTemplate : renderTemplate
    
}