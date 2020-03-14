import { strict as assert } from 'assert'
import { get_token } from '../src/Machine'

describe('Machine', function () {
  it('Machine', async function () {
    this.timeout(3000)
    const res = await get_token(process.env.CLIENT_ID, process.env.CLIENT_SCRET)
    assert.deepEqual(Object.keys(res), ['access_token', 'expires_in', 'scope', 'refresh_token', 'token_type'])
  })
})
