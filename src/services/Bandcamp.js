'use strict'
import _ from 'lodash'

export const parseInfo = function (body) {
  let regex = /<meta\b[^>]*>/gi
  let matches = body.match(regex)
  let mets = matches.map( (item) => {
    let regex2 = /([a-z]+)="([^"]*)"/gi
    let meta = {}
    let match
    while ((match = regex2.exec(item))) {
      meta[match[1]] = match[2]
    }
    return meta
  })

  let info = mets.reduce((prev, curr) => {
    let c = {}
    let key = (curr.name) ? curr.name : curr.property
    if (!key) return prev
    c[key] = curr.content
    return Object.assign(c, prev)
  }, {})
  return info
}

export const parseFans = (body) => {
  const regex = /id="collectors-data" data-blob="([^"]+)"/
  const match = regex.exec(body)
  const fans = JSON.parse(_.unescape(match[1]))
  return fans
}

const parseJSObject = function(body, name) {
  let regex = new RegExp('var ' + name + ' = ({(.|\\s)*?)};','gmi')
  let match = regex.exec(body)
  let res = match[0]
    .replace(/^\s*\/\/ .*\n/gm, '')
    .replace(/,\s\/\/ .*\n/gm, ',')
    .replace('var ' + name + ' = ', '')
    .replace(/^\s+([a-z_A-Z]+)\s?:/gm, '"$1":')
    .replace('" + "', '')
    .replace(/;$/, '')
    .replace(/\s+id:/g, ' "id":')
  return JSON.parse(res)
}

export const parseData = function(body) {
  return parseJSObject(body, 'TralbumData')
}
