'use strict'

const benchmark = require('benchmark')
const { URL, parse } = require('url')
const urlParser = require('.')
const { URL: NURL } = urlParser

const suite = new benchmark.Suite()

const testUrl = 'http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content'

suite
  .add('WHATWG URL', () => {
    return new URL(testUrl)
  })
  .add('Nodejs url.parse', () => {
    parse(testUrl)
  })
  .add('urlParser from jQuery Mobile', () => {
    urlParser(testUrl)
  })
  .add('urlParser in WHATWG URL way', () => {
    return new NURL(testUrl)
  })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
    console.log('Slowest is ' + this.filter('slowest').map('name'))
  })
  .run({maxTime: 10})
