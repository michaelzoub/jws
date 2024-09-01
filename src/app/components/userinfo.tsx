
import { headers } from "next/headers"

export function Info() {
    const userId = headers().get('x-user-data')
    
    return(
        <div>{userId}</div>
    )
}
