import Formdata from 'form-data'
import 'isomorphic-fetch'

export async function get_token (client_id, client_secret) {
  const form = new Formdata()
  const obj = {
    client_id,
    client_secret,
    grant_type: 'client_credentials'
  }
  Object.entries(obj).forEach(([k, v]) => form.append(k, v))
  return await fetch('https://api.korbit.co.kr/v1/oauth2/access_token', {
    method: 'POST',
    body: form
  }).then(res => res.json())
}
