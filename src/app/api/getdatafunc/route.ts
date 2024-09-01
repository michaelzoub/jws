import { headers } from "next/headers";
import { cookies } from "next/headers";

export function GET() {
    const headerList = headers()
    const userData: any = headerList.get('x-user-data')
    const parsed = JSON.parse(userData)
    console.log('Header get in getdatafunc:', userData)
    const companies = parsed
    return companies
}