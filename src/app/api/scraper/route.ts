'use server'
import puppeteer from 'puppeteer'
import { NextResponse } from 'next/server'

const apple = "https://jobs.apple.com/en-us/search?location=united-states-USA"

export async function GET(request: Request) {
    try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(apple)

    const allArticles = await page.evaluate(()=> {
        const articles = document.querySelectorAll('tbody')

        return Array.from(articles).map((e:any)=> {
            const jobTitle = e.querySelector('a').innerText
            const url = e.querySelector('a').href
            return { jobTitle, url }
        })
    })
    await browser.close()
    console.log(allArticles)
    return NextResponse.json(allArticles)
    } catch (error) {
        return NextResponse.json({status:500})
    }
}
