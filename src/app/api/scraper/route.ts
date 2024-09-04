
import puppeteer from 'puppeteer'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers' //to check what company user has registered
import { sendEmail } from '../sendemail/send'
//also import all users from db
import { connectToDatabase } from '../../utils/mongodb'


const apple = "https://jobs.apple.com/en-us/search?location=united-states-USA"
const amazon = "https://www.amazon.jobs/content/en/job-categories/software-development?country%5B%5D=US"
const nvidia = "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite?locationHierarchy1=2fcb99c455831013ea52fb338f2932d8"
const meta = "https://www.google.com/search?q=meta%20engineer%20job%20postings&sca_esv=1ebd42d001b6190b&biw=795&bih=999&sxsrf=ADLYWIK5Od4XTb7Ws1fU3yMkEdE_OK8CDQ%3A1724965138362&ei=EuHQZtbhFdaIptQPicq3gAE&ved=2ahUKEwjUmqeAjJuIAxXdrokEHRd2DYQQ3L8LegQIKBAM&uact=5&oq=meta%20engineer%20job%20postings&gs_lp=Egxnd3Mtd2l6LXNlcnAiGm1ldGEgZW5naW5lZXIgam9iIHBvc3RpbmdzMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBEjKDlDABlisDXACeAGQAQCYAXGgAb0GqgEDOC4xuAEDyAEA-AEBmAIIoALCBMICChAAGLADGNYEGEfCAgcQIxiwAhgnwgIKECEYoAEYwwQYCpgDAIgGAZAGCJIHAzYuMqAHzCA&sclient=gws-wiz-serp&jbr=sep:0&udm=8"



//change this to POST once I'm ready to deploy to prod (CRON checks this file for POST routes)

export async function GET(request: Request) {
    console.log('api scraper cron running')
}

