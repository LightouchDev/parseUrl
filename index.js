'use strict'

/*
 *  parseUrl adapt from jQuery Mobile
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
const urlParseRE = /^\s*([^:/#?]+:)?(?:\/\/(?:([^:@/#?]+)(?::([^:@/#?]+))?@)?(([^:/#?\][]+|\[[^/\]@#?]+\])(?::([0-9]+))?))?(\/?(?:[^/?#]+\/+)*[^?#]*)(\?[^#]+)?(#.*)?/

function parseUrl (url) {
  if (typeof url !== 'string') throw new Error('Invalid URL')
  const matches = urlParseRE.exec(url || '') || []

  if (matches[1] === undefined) throw new Error('Invalid URL')

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
    pathname: matches[7] || '',
    search: matches[8] || '',
    hash: matches[9] || '',
    origin: `${matches[1]}//${matches[4]}` || ''
  }
}

class URL {
  constructor (url) {
    if (typeof url !== 'string') throw new Error('Invalid URL')
    const matches = urlParseRE.exec(url || '') || []

    if (matches[1] === undefined) throw new Error('Invalid URL')
    ;[
      this.herf = '',
      this.protocol = '',
      this.username = '',
      this.password = '',
      this.host = '',
      this.pathname = '',
      this.search = '',
      this.hash = ''
    ] = matches
    this.origin = `${matches[1]}//${matches[4]}`
  }
}

module.exports = parseUrl
module.exports.URL = URL
