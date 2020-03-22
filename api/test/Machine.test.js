import { strict as assert } from 'assert'
import * as x from '../src/Machine'

const { CLIENT_ID, CLIENT_SECRET } = process.env

describe('Machine', function () {
  this.timeout(5000)
  describe('getToken', () => {
    let authRes
    it('getToken', async function () {
      authRes = await x.getAccessToken(CLIENT_ID, CLIENT_SECRET)
      assert.deepEqual(Object.keys(authRes), ['access_token', 'expires_in', 'scope', 'refresh_token', 'token_type'])
    })
    it('refreshToken', async function () {
      const res = await x.getRefreshedToken(CLIENT_ID, CLIENT_SECRET, authRes.refresh_token)
      assert.deepEqual(Object.keys(res), ['access_token', 'expires_in', 'scope', 'refresh_token', 'token_type'])
    })
  })
  describe('getTicker', function () {
    it('getTicker', async function () {
      const res = await x.getTicker('btc_krw')
      assert.deepEqual(Object.keys(res),
        ['timestamp', 'last', 'open', 'bid', 'ask', 'low', 'high', 'volume', 'change', 'changePercent'])
    })
  })
  describe('list of field order', function () {
    it('transactions', async function () {
      const res = await x.transaction('btc_krw', 'minute')
      assert.deepEqual(Object.keys(res[0]), ['timestamp', 'tid', 'price', 'amount', 'type'])
    })
  })
  describe('Query balances', function () {
    it('balances', async function () {
      const { access_token } = await x.getAccessToken(CLIENT_ID, CLIENT_SECRET)
      const res = await x.balances(access_token)
      assert.deepEqual(Object.keys(res.krw), ['available', 'balance'])
    })
  })
})
