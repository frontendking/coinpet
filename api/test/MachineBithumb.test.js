import { strict as assert } from 'assert'
import * as x from '../src/MachineBithumb'

const { CLIENT_ID, CLIENT_SECRET } = process.env

describe('Machine', function () {
  this.timeout(10000)
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
  describe('Trading', function () {
    /*    it('Place a Bid Order', async function () {
      // const { access_token } = await x.getAccessToken(CLIENT_ID, CLIENT_SECRET)
      const res = await x.buy(access_token, 'etc_krw', 'limit', '15000', '1')
      assert.deepEqual(Object.keys(res), ['orderId', 'status', 'currencyPair'])
    }) */
    // it('Place an Ask Order', async function () {
    //   const { access_token } = await x.getAccessToken(CLIENT_ID, CLIENT_SECRET)
    //   const res = await x.sell(access_token, 'etc_krw', 'limit', '15000', '1')
    //   assert.deepEqual(Object.keys(res), ['orderId', 'status', 'currencyPair'])
    // })
    // todo - test with a little money
    it.only('Place a Bid Order and Cancel Open Order', async function () {
      const { access_token } = await x.getAccessToken(CLIENT_ID, CLIENT_SECRET)
      const resBuy = await x.buy(access_token, 'eth_krw', 'limit', '1000', '1')
      let res = await x.cancel(access_token, 'etc_krw', '4eca2144-a179-44eb-8add-3b8321866bd7')
      console.log(res[0].orderId)
      assert.deepEqual(Object.keys(res[0]), ['orderId', 'status', 'currencyPair'])
      assert.deepEqual(res[0].status, 'success')
    })
    it('Place an Ask Order and View Exchange Orders', async function () {
      const { access_token } = await x.getAccessToken(CLIENT_ID, CLIENT_SECRET)
      const res = await x.orders(access_token)
      assert.deepEqual(Object.keys(res).includes)
    })
  })
})

function sleep (time) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('sucess')
    }, time)
  })
}
