import Formdata from 'form-data'
import 'isomorphic-fetch'
import { omit, curry, each, entries, go, pipe } from 'fxjs/Strict'
import * as _ from 'fxjs/Strict'
import * as L from 'fxjs/Lazy'
const e = process.env

function getFormWith (param) {
  const form = new Formdata()
  go(
    entries(param),
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
