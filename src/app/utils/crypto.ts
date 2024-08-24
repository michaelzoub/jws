import crypto from 'crypto'

export function hash(password:any) {
    const key = crypto.pbkdf2Sync(password, 'jwswebscraper', 100, 64, 'sha512');
    return key.toString('hex')
}
