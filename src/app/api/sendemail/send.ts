
import nodemailer from 'nodemailer'
import { NextResponse } from "next/server";

//create email function and export it to scraper folder where it runs on cron, have three parameters: to user (email), companies and url

const email = process.env.EMAIL_USER
const pass = process.env.PASS_USER

//POST is for testing
export async function POST(request: Request) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: email,
      pass: pass
    }
  });

  try {
    const emailPromise = await transporter.sendMail({
        from: 'jws@onl.com',
        to: 'micacao15@gmail.com',
        subject: `Companies has a new job post! Apply here: url`,
        text: `A new job post from casd is available. Apply here: csdf`,
        html: `<b style="color:purple;">jws.onl</b><br><b>A new job post from csdf is available.</b><br>Apply here: <a href="google.com"></a>`,
      });
      console.log(emailPromise.messageId)

    return NextResponse.json({status:200, message: 'Email sent.'})
  } catch (error) {
    return NextResponse.json({status:500})
  }
}

export async function sendEmail(user:string, companies:any, url:string, position: string, date:any) {
    //1 create transporter

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Use TLS
        auth: {
          user: email,
          pass: pass
        }
      });

      try {
        const emailPromise = await transporter.sendMail({
            from: 'jws@onl.com',
            to: user,
            subject: `${companies} has a new job post!`,
            text: `A new job post from ${companies} for the ${position} role has just been posted. Apply here: ${url}`,
            html: `<b>A new job post from ${companies} for the ${position} role has just been posted.</b><br>Apply here: <a href="${url}">${url}</a>`,
          });
          console.log(emailPromise.messageId)

        return NextResponse.json({status:200, message: 'Email sent.'})
      } catch (error) {
        return NextResponse.json({status:500})
      }
}