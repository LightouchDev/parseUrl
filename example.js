'use strict'

const parseUrl = require('.')
const { URL } = parseUrl

const testUrl = 'http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content'

console.log(parseUrl(testUrl))
console.log(parseUrl('http://example.com/foo'))
console.log(parseUrl('http://測試.com'))

console.log(new URL(testUrl))
console.log(new URL('/foo', new URL('http://example.com/')))
console.log(new URL('http://測試.com'))

// console.log(parseUrl('//jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content')) // Throw error
