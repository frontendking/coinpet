import Formdata from 'form-data'
import 'isomorphic-fetch'
import * as _ from 'fxjs/Strict'
import { curry, each, entries, go, omit } from 'fxjs/Strict'
import * as L from 'fxjs/Lazy'
import { korbit as api } from '../.config.js'
const e = process.env

function getFormWith (param) {
  const form = new Formdata()
  go(
    entries(param),
    L.filter(([k, v]) => v),
    each(v => (form.append(...v)))
  )
  return form
}

async function getToken (grant_type, client_id, client_secret, refresh_token) {
  let param = { client_id, client_secret, refresh_token, grant_type }
  if (!refresh_token) param = omit(['refresh_token'], param)
  const res = await fetch(`${e.BASEURL}${e.API_ACCESSTOKEN}`, {
    method: 'POST',
    body: getFormWith(param)
  })
  return res.json()
}

export const getAccessToken = curry(getToken)('client_credentials')
export const getRefreshedToken = curry(getToken)('refresh_token')

export async function getTicker (currency_pair) {
  if (!currency_pair) throw Error('Need to currency type')
  const param = { currency_pair }
  const res = await fetch(`${e.BASEURL}${e.API_TICKER}`, {
    method: 'GET',
    body: getFormWith(param)
  })
  return res.json()
}

export async function transaction (currency_pair, time) {
  const res = await fetch(`${e.BASEURL}${e.API_TRANSACTIONS}`, {
    method: 'GET',
    body: getFormWith({ currency_pair, time })
  })
  return res.json()
}

export async function balances (accessToken) {
  const res = await fetch(`${e.BASEURL}${e.API_BALANCE}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return _.go(
    res.json(),
    _.entries,
    L.filter(([k, v]) => v.available > 0),
    L.map(([k, v]) => {
      v.balance = Number(v.trade_in_use) + Number(v.withdrawal_in_use)
      return [k, _.pick(['available', 'balance'], v)]
    }),
    _.object
  )
}

export async function sell (accessToken, currency_pair, type, price, coin_amount) {
  const res = await fetch(`${e.BASEURL}${e.API_SELL}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: getFormWith({
      currency_pair, type, price, coin_amount
    })
  })
  return res.json()
}

export async function buy (accessToken, currency_pair, type, price, coin_amount, flat_amount) {
  const res = await fetch(`${e.BASEURL}${e.API_BUY}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: getFormWith({
      currency_pair, type, price, coin_amount, flat_amount,
      nounce: (new Date()).getTime()
    })
  })
  return res.json()
}

export async function cancel (accessToken, currency_pair, id) {
  const res = await fetch(`${api.baseUrl}${api.cancel}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: getFormWith({
      currency_pair, id,
      nounce: (new Date()).getTime()
    })
  })
  return res.json()
}

// todo - change param to option
export async function order (accessToken, currency_pair, status, id, offset, limit) {
  const res = await fetch(`${api.baseUrl}${api.order}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: getFormWith({
      currency_pair, status, id, offset, limit
    })
  })
  return res.json()
}
