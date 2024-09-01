
import puppeteer from 'puppeteer'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers' //to check what company user has registered
import { getData } from '../getdatafunc/route'
import { sendEmail } from '../sendemail/route'
//also import all users from db
import { connectToDatabase } from '../../utils/mongodb'


const apple = "https://jobs.apple.com/en-us/search?location=united-states-USA"
const amazon = "https://www.amazon.jobs/content/en/job-categories/software-development?country%5B%5D=US"
const nvidia = "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite?locationHierarchy1=2fcb99c455831013ea52fb338f2932d8"
const meta = "https://www.google.com/search?q=meta%20engineer%20job%20postings&sca_esv=1ebd42d001b6190b&biw=795&bih=999&sxsrf=ADLYWIK5Od4XTb7Ws1fU3yMkEdE_OK8CDQ%3A1724965138362&ei=EuHQZtbhFdaIptQPicq3gAE&ved=2ahUKEwjUmqeAjJuIAxXdrokEHRd2DYQQ3L8LegQIKBAM&uact=5&oq=meta%20engineer%20job%20postings&gs_lp=Egxnd3Mtd2l6LXNlcnAiGm1ldGEgZW5naW5lZXIgam9iIHBvc3RpbmdzMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBEjKDlDABlisDXACeAGQAQCYAXGgAb0GqgEDOC4xuAEDyAEA-AEBmAIIoALCBMICChAAGLADGNYEGEfCAgcQIxiwAhgnwgIKECEYoAEYwwQYCpgDAIgGAZAGCJIHAzYuMqAHzCA&sclient=gws-wiz-serp&jbr=sep:0&udm=8"



//change this to POST once I'm ready to deploy to prod (CRON checks this file for POST routes)

export async function GET(request: Request) {

    const data = getData() //data from getdata api route -> check what they are to only perform actions on certain companies
    const user = data.userId //this gets the email
    const companies = data.companies //this gets the companies


    try {
        console.log('tryinggg')
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(apple, { waitUntil: 'networkidle0' })
    const appleData = await page.evaluate(() => {
        const articles = document.querySelectorAll('tbody');
        return Array.from(articles).map((e: any) => {
            const jobTitle = e.querySelector('a').innerText;
            const url = e.querySelector('a')?.href;
            const date = e.querySelector('span.table--advanced-search__date').innerText
            return { jobTitle, url, date };
        });
    });
    console.log('apple data',appleData)
    await page.goto(amazon, { waitUntil: 'networkidle0' })
    const amazonData = await page.evaluate(() => {
        const articles = document.querySelectorAll('ul.jobs-module_root__gY8Hp li');
        return Array.from(articles).map((e: any) => {
            const jobTitle = e.querySelector('a').innerText;
            const url = e.querySelector('a')?.href
           // const date = e.querySelector('div.metadatum-module_text__ncKFr.css-1ruyw7v[textContent*="Updated"]');
            return {  jobTitle, url, };
        });
    });

    await page.goto(nvidia, {waitUntil: 'networkidle0'})
    const nvidiaData = await page.evaluate(()=> {
        const articles = document.querySelectorAll('ul li');
        return Array.from(articles).map((e: any) => {
            //const jobTitle = e.querySelector('a.css-19uc56f').innerText;
            const url = e.querySelector('a.css-19uc56f')?.href
           //const date = e.querySelector('div.css-zoser8').innerText;
            return { url, };
        });
    })

    await page.goto(meta, {waitUntil: 'networkidle0'})
    const metaData = await page.evaluate(()=> {
        const articles = document.querySelectorAll('div div.EimVGf');
        return Array.from(articles).map((e: any) => {
            //const jobTitle = e.querySelector('a.css-19uc56f').innerText;
            const url = e.querySelector('a.css-19uc56f')?.href
           //const date = e.querySelector('div.css-zoser8').innerText;
            return { url, };
        });
    })

    //create an array with all company data in objects
    const object:any =  [

        {apple: appleData},
        {amazon: amazonData},
        {nvidia: nvidiaData},

    ]

    const now = new Date()
    const day = `${now.getDate()}`

    //pull data from mongodb
    const {db} = await connectToDatabase()
    const collection = await db.collection('users')

    //use function, return boolean
    for (let i = 0; i < object.length; i++) {
        console.log('for loop hit')
        let company:any = Object.keys(object[i])
        let data:any = object[i][company]
        const firstObject = data[0]
    if(firstObject.date.includes(day)) {
        const matchingUsers = await collection.find({companies: company[0]}).toArray() //finds profiles where companies has the company index is currently on
        matchingUsers.forEach((e:any)=> {
            //i'd have email function here ->
            sendEmail(e.user, [company][0], data[0].url, data[0].jobTitle, now)
            console.log(`Sending email about ${company[0]}) to ${e.user}}`)
        })
    }
}

    await browser.close()
    console.log('sdasd')
    console.log('Companies: ', object)
    return NextResponse.json(object)
    } catch (error) {
        return NextResponse.json({status:500})
    }
}

