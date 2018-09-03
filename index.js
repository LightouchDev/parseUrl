'use strict'

const path = require('path')
const punycode = require('punycode')

/*
 *  urlParser adapt from jQuery Mobile
 */

// This scary looking regular expression parses an absolute URL. When used with RegExp.exec()
// or String.match, it parses the URL into a results array that looks like this:
//
//     [0]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content
//     [1]: http:
//     [2]: jblas
//     [3]: password
//     [4]: mycompany.com:8080
//     [5]: mycompany.com
//     [6]: 8080
//     [7]: /mail/inbox
//     [8]: ?msg=1234&type=unread
//     [9]: #msg-content
//
const urlParseRE = /^\s*([^:/#?]+:)?\/\/(?:(?:([^:@/#?]+)(?::([^:@/#?]+))?@)?(([^:/#?\][]+|\[[^/\]@#?]+\])(?::([0-9]+))?))?(\/?(?:[^/?#]+\/+)*[^?#]*)(\?[^#]+)?(#.*)?/
const isASCII = /^[\u0000-\u007f]*$/
const preParse = /^([^:/#?]+:)\/\/(.*)/
const objectString = Object.prototype.toString()

function parse (url) {
  if (!isASCII.test(url)) {
    url = preParse.exec(url)
    url = `${url[1]}//${punycode.toASCII(url[2])}`
  }
  url.replace(/[\u00A0-\u9999<>&]/gim, (i) => {
    return `&#${i.charCodeAt(0)};`
  })
  const matches = urlParseRE.exec(url || '') || []
  if (matches[1] === undefined) throw new Error(`Invalid URL: ${url}`)

  return matches
}

function urlParser (url) {
  if (typeof url !== 'string') throw new Error(`Invalid URL: ${url}`)

  const matches = parse(url)

  // Create an object that allows the caller to access the sub-matches
  // by name. Note that IE returns an empty string instead of undefined,
  // like all other browsers do, so we normalize everything so its consistent
  // no matter what browser we're running on.
  return {
    href: matches[0] || '',
    protocol: matches[1] || '',
    username: matches[2] || '',
    password: matches[3] || '',
    host: matches[4] || '',
    hostname: matches[5] || '',
    port: matches[6] || '',
    pathname: matches[7] ? path.posix.join(matches[7]) : '',
    search: matches[8] || '',
    hash: matches[9] || '',
    origin: `${matches[1]}//${matches[4] || ''}`
  }
}
class URL {
  constructor (input, base) {
    let url
  
    if (typeof input === 'string') {
      if (base !== undefined) {
        if (typeof base === 'string') {
          url = base
        } else if (typeof base === 'object') {
          let baseUrl
          if (typeof base.origin === 'string' && base.origin) {
            baseUrl = base.origin
          }
          url = baseUrl.replace(/\/?$/, '') + input.replace(/^\/?(.*)$/, '/$1') // combine url
        } else {
          throw new Error(`Invalid base URL: ${base}`)
        }
      } else {
        url = input
      }
    } else if (typeof input === 'object' && typeof input.toString === 'function') {
      const result = input.toString()
      if (result !== objectString) {
        url = result
      }
    } else {
      throw new Error(`Invalid URL: ${input}`)
    }
  
    const matches = parse(url)
  
    this.href = matches[0] || ''
    this.protocol = matches[1] || ''
    this.username = matches[2] || ''
    this.password = matches[3] || ''
    this.host = matches[4] || ''
    this.hostname = matches[5] || ''
    this.port = matches[6] || ''
    this.pathname = matches[7] ? path.posix.join(matches[7]) : ''
    this.search = matches[8] || ''
    this.hash = matches[9] || ''
  
    this.origin = `${matches[1]}//${matches[4] || ''}`
  }  
}

module.exports = urlParser
module.exports.URL = URL
