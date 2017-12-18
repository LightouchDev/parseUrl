'use strict'

const parseUrl = require('.')
const { URL } = parseUrl

const testUrl = 'http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content'

console.log(parseUrl(testUrl))
console.log(parseUrl('http://example.com/foo'))

console.log(new URL(testUrl))
console.log(new URL('http://example.com/foo'))

// console.log(parseUrl('//jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content')) // Throw error
