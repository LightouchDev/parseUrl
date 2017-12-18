'use strict'

const urlParser = require('.')
const URL = urlParser.URL

const testUrl = 'http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content'

console.log(urlParser(testUrl))
console.log(urlParser('http://example.com/foo'))
console.log(urlParser('http://測試.com'))

console.log(new URL(testUrl))
console.log(new URL('/foo', new URL('http://example.com/')))
console.log(new URL('http://測試.com'))

// console.log(urlParser('//jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content')) // Throw error
