import { strict as assert } from 'assert'
import * as x from '../src/Machine'

const { CLIENT_ID, CLIENT_SECRET } = process.env

describe('Machine', function () {
  describe('getToken', () => {
    let authRes
    it('getToken', async function () {
      this.timeout(3000)
      authRes = await x.getAccessToken(CLIENT_ID, CLIENT_SECRET)
      assert.deepEqual(Object.keys(authRes), ['access_token', 'expires_in', 'scope', 'refresh_token', 'token_type'])
    })
    it('refreshToken', async function () {
      this.timeout(3000)
      const res = await x.getRefreshedToken(CLIENT_ID, CLIENT_SECRET, authRes.refresh_token)
      assert.deepEqual(Object.keys(res), ['access_token', 'expires_in', 'scope', 'refresh_token', 'token_type'])
    })
  })
})
