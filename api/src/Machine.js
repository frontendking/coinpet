import Formdata from 'form-data'
import 'isomorphic-fetch'
import { omit, curry, each, entries, go } from 'fxjs/Strict'

async function getToken (grant_type, client_id, client_secret, refresh_token) {
  const { BASEURL } = process.env
  const form = new Formdata()
  let param = { client_id, client_secret, refresh_token, grant_type }
  if (!refresh_token) param = omit(['refresh_token'], param)
  go(
    entries(param),
    each(v => form.append(...v))
  )
  const res = await fetch(`${BASEURL}/access_token`, {
    method: 'POST',
    body: form
  })
  return res.json()
}

export const getAccessToken = curry(getToken)('client_credentials')
export const getRefreshedToken = curry(getToken)('refresh_token')
